const { DateTime } = require('luxon');
const {v4: uuidv4} = require('uuid');

const categories = {
    Anime: 'Anime', 
    Manga: 'Manga',
    Accessories: 'Accessories',
    ActionFigures: 'Action Figures'

};

const stat = {
    Sold: 'Sold',
    NotSold: 'NotSold'
};

const trades = [
    {
        id: '1',
        title: 'Attack on Titan Vol 1',
        discription: "In this post-apocalytpic sci-fi story, humanity has been devastated by the bizarre, giant humanoids known as the Titans. Little is known about where they came from or why they are bent on consuming mankind. Seemingly unintelligent, they have roamed the world for years, killing everyone they see. For the past century, what's left of man has hidden in a giant, three-walled city. People believe their 50-meter-high walls will protect them from the Titans, but the sudden appearance of an immense Titan is about to change everything.",
        stat: stat.NotSold,
        image: 'AOTv1.jpg',
        createdAt:  DateTime.local(2022, 2, 12, 19, 0).toLocaleString(DateTime.DATETIME_SHORT),
        category: categories.Anime
    },
    {
        id: '4',
        title: 'Demon Slayer (Kimetsu no Yaiba)',
        discription: 
        "After their rehabilitation training, Tanjiro and his comrades begin their next mission on the Mugen Train, where over 40 people have disappeared. With one of the most powerful swordsmen, Flame Hashira Kyojuro Rengoku, they face the nightmare on board."
        ,
        stat: stat.NotSold,
        image: 'AOTv1.jpg',
        date:  DateTime.local(2022, 2, 12, 19, 1).toLocaleString(DateTime.DATETIME_SHORT),
        category: categories.Anime
    },
    {
        id: '2',
        title: 'Levi',
        discription: "Levi action figure - Levi Ackerman (リヴァイ・アッカーマン Rivai Akkāman?), often formally referred to as Captain Levi (リヴァイ兵長 Rivai Heichō?), is the squad captain (兵士長 Heishichō?, lit. 'leader of the soldiers') of the Special Operations Squad within the Survey Corps and is widely known as humanity's strongest soldier",
        stat: stat.NotSold,
        image: 'levi.jpg',
        date:  DateTime.local(2022, 2, 12, 19, 2).toLocaleString(DateTime.DATETIME_SHORT),
        category: categories.ActionFigures
    },
    {
        id: '3',
        title: 'Tanjiro Kamado Action Figure',
        discription: "Banpresto Demon Slayer: Kimetsu No Yaiba Maximatic Tanjiro Kamado Figure",
        stat: stat.NotSold,
        image: 'tanjiro_kamado.jpg',
        createdAt:  DateTime.local(2022, 2, 12, 19, 3).toLocaleString(DateTime.DATETIME_SHORT),
        category: categories.ActionFigures
    },
    {
        id: '5', 
        title: 'Attack on Titan Vol 1',
        discription: "In this post-apocalytpic sci-fi story, humanity has been devastated by the bizarre, giant humanoids known as the Titans. Little is known about where they came from or why they are bent on consuming mankind. Seemingly unintelligent, they have roamed the world for years, killing everyone they see. For the past century, what's left of man has hidden in a giant, three-walled city. People believe their 50-meter-high walls will protect them from the Titans, but the sudden appearance of an immense Titan is about to change everything.",
        stat: stat.NotSold,
        image: 'AOTv1.jpg',
        createdAt:  DateTime.local(2022, 2, 12, 19, 4).toLocaleString(DateTime.DATETIME_SHORT),
        category: categories.Manga
    },
    {
        id: '6',
        title: 'Deamon Slayer Vol 1',
        discription: "After their rehabilitation training, Tanjiro and his comrades begin their next mission on the Mugen Train, where over 40 people have disappeared. With one of the most powerful swordsmen, Flame Hashira Kyojuro Rengoku, they face the nightmare on board.",
        stat: stat.NotSold,
        image: 'demonslayer.jpg',
        createdAt:  DateTime.local(2022, 2, 12, 19, 5).toLocaleString(DateTime.DATETIME_SHORT),
        category: categories.Manga
    },
    {
        id: '7',
        title: 'Attack on Titan T-Shirt',
        discription: "", 
        stat: stat.NotSold,
        image: 'aottshirt.jpg',
        createdAt:  DateTime.local(2022, 2, 12, 19, 6).toLocaleString(DateTime.DATETIME_SHORT),
        category: categories.Accessories
    },
    {
        id: '8',
        title: 'Deamon Slayer Back Packs',
        discription: "Demon Slayer Back Pack with Tanjiro Kamado Pattern ",
        stat: stat.NotSold,
        image: 'demonslayerbackpack.jpg',
        createdAt:  DateTime.local(2022, 2, 12, 19, 7).toLocaleString(DateTime.DATETIME_SHORT),
        category: categories.Accessories
    },

]

module.exports.addTrade = function addTrade(trade){
    trade.id = uuidv4()
    trade.createdAt = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
    trades.push(trade);
    console.log(trades);
    return trade;
};


exports.getTrades = () => trades;
findByID= (id) => trades.find(trade => trade.id === id);
exports.getCategories = () =>  Object.values(categories);   
exports.findByID = findByID;

exports.getTradesByCategory = () => trades.filter(trade=> trade.category === category);

exports.updateById = (id, updatedTrade) => {
    let trade = findByID(id);
    updatedTrade.id = id;
    if (trade) {
        trade.title = updatedTrade.title;
        trade.category = updatedTrade.category;
        trade.discription = updatedTrade.discription
        return true;
    } else {
        return false
    }
};

exports.deleteById = (id) => {
    let index = trades.findIndex(trade => trade.id === id);
    if (index !== -1) {
        trades.splice(index, 1);
        return true;
    } else {
        return false;
    }
}