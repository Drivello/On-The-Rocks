const bcrypt = require('bcrypt');
const {	User } = require('../../db');

const userMockUp = async () => {
    // --- Users ---

    const hashedPasswordA = await bcrypt.hash('123', 12);

    try {

        await User.create({
            name: 'Lucas Panaro',
            username: 'marlopc',
            email: 'lucaspanaro1@gmail.com',
            password: hashedPasswordA,
            contact: '2314558392',
        });
    
        await User.create({
            name: 'Fede Fleitas',
            username: 'FedeFleitas',
            email: 'solamentefedee@gmail.com',
            password: hashedPasswordA,
            contact: '3364013491',
        });
    
        await User.create({
            name: 'Hilber Fraiese',
            username: 'Hilberfraiese',
            email: 'hilberfraiese92@gmail.com',
            password: hashedPasswordA,
            contact: '2235421793',
        });

        await User.create({
            name: 'Agustin Moroni',
            username: 'Moroni82',
            email: 'agus-234@hotmail.com',
            password: hashedPasswordA,
            contact: '2314610603',
        });

        await User.create({
            name: 'Matias Vega',
            username: 'mativegal',
            email: 'matiasvegalera@gmail.com',
            password: hashedPasswordA,
            contact: '1160011862',
        });

    }catch (e) {
        console.log(e.message);
    }
}

const adminMockUp = async() => {
    // --- Admin ---

    const hashedPasswordB = await bcrypt.hash('321', 12);

    try{

        await User.create({
            name: 'Gaston Benitez',
            username: 'Gaston95',
            isAdmin: true,
            email: 'tonga30.gnb@gmail.com',
            password: hashedPasswordB,
            contact: '3743414898',
        });

        await User.create({
            name: 'Nicolas Sanchez',
            username: 'Drivello',
            isAdmin: true,
            email: 'nico_dd@outlook.com.ar',
            password: hashedPasswordB,
            contact: '1127257701',
        });

        await User.create({
            name: 'David Melo',
            username: 'DavidLMP1',
            isAdmin: true,
            email: 'david_melo10@yahoo.es',
            password: hashedPasswordB,
            contact: '3187826213',
        });

    }catch (e) {
        console.log(e.message);
    }
}

module.exports = {
    userMockUp,
    adminMockUp
}

