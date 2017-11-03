const csvFilePath = './reviews.csv',
    csv = require('csvtojson'),
    db = require('./db'),
    relations = require('../db/models/relations'),
    data = [];

db.sync().then(() => {
    console.log('done syncing');
    csv().fromFile(csvFilePath)
        .on('json', (obj) => {
            data.push(obj);
        })
        .on('done', (err) => {
            if (err) console.log('err', err);
            else {
                console.log('end', data.length);
                save(0, () => {
                    console.log('done');
                });
            }
        });
}).catch(err => {
    console.log('err', err);
});

function save(index, fn) {
    if (index >= data.length) {
        return fn();
    }
    let obj = data[index];
    findOrCreateUser(obj, () => {
        index++;
        save(index, fn);
    });
}

function findOrCreateUser(obj, fn) {
    relations.User.findOrCreate({
        where: { email: obj.sitter_email },
        defaults: {
            name: obj.sitter,
            email: obj.sitter_email,
            phone: obj.sitter_phone_number,
            image: obj.sitter_image
        }
    }).then(sitterUsers => {
        let sitterUser = sitterUsers[0];
        relations.Sitter.findOrCreate({
            where: { userId: sitterUser.id },
            defaults: {
                score: score(sitterUser.name),
                rating: 0,
                rank: 0
            }
        }).then(sitters => {
            let sitter = sitters[0];
            relations.User.findOrCreate({
                where: { email: obj.owner_email },
                defaults: {
                    name: obj.owner,
                    email: obj.owner_email,
                    phone: obj.owner_phone_number,
                    image: obj.owner_image
                }
            }).then(ownerUsers => {
                let ownerUser = ownerUsers[0];
                relations.Owner.findOrCreate({
                    where: { userId: ownerUser.id },
                    defaults: {
                        dogs: obj.dogs
                    }
                }).then((owners) => {
                    let owner = owners[0];
                    relations.Stay.create({
                        rating: obj.rating,
                        startDate: obj.start_date,
                        endDate: obj.end_date,
                        sitterId: sitter.id,
                        ownerId: owner.id
                    }).then((stay) => {
                        relations.Stay.findAll({
                            where: {
                                sitterId: sitter.id
                            }
                        }).then(stays => {
                            let rating = 0,
                                rank = 0;
                            if (stays.length) {
                                rating = stays.reduce((a, b) => {
                                    a += b.rating;
                                    return a;
                                }, 0) / stays.length;
                            }
                            if (stays.length > 9) {
                                rank = sitter.rating;
                            } else {
                                rank = ((sitter.score * (10 - stays.length)) + (sitter.rating * stays.length)) / 10;
                            }
                            relations.Sitter.update({
                                rating: rating,
                                rank: rank
                            }, { where: { id: sitter.id } }).then(() => {
                                fn();
                            }).error(err => {
                                if (err) console.log('err', err);
                                fn();
                            });
                        }).error(err => {
                            if (err) console.log('err', err);
                            fn();
                        });
                    }).error(err => {
                        if (err) console.log('err', err);
                        fn();
                    });
                }).error(err => {
                    if (err) console.log('err', err);
                    fn();
                });
            }).error(err => {
                if (err) console.log('err', err);
                fn();
            });
        }).error(err => {
            if (err) console.log('err', err);
            fn();
        });
    }).error(err => {
        if (err) console.log('err', err);
        fn();
    });
}

function score(name) {
    let uniq = name.toLowerCase().replace(/[^a-z]+/g, '').split('').filter((v, i, a) => a.indexOf(v) === i);
    return 5 * (uniq.length / 26);
}