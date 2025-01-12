// 聚餐分帳計算器
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function dinnerSplitCalculator() {
    // 建立用餐資訊
    const date = await askQuestion("請輸入用餐日期 (YYYY/MM/DD): ");
    const location = await askQuestion("請輸入用餐地點: ");

    const items = [];
    const participants = new Set();

    while (true) {
        const name = await askQuestion("請輸入人名 (或輸入 'done' 結束): ");
        if (name.toLowerCase() === 'done') break;

        participants.add(name);

        const itemName = await askQuestion(`請輸入${name}的餐點名稱: `);
        const price = parseFloat(await askQuestion(`請輸入${itemName}的單價 (數字): `));
        const isShared = (await askQuestion("是否均分此餐點? (yes/no): ")).toLowerCase() === 'yes';

        items.push({ name, itemName, price, isShared });
    }

    // 計算分帳
    const participantArray = Array.from(participants);
    const total = items.reduce((sum, item) => sum + item.price, 0);
    const sharedCosts = {};
    const individualCosts = {};

    participantArray.forEach(person => {
        sharedCosts[person] = 0;
        individualCosts[person] = 0;
    });

    items.forEach(item => {
        if (item.isShared) {
            const sharedPrice = item.price / participantArray.length;
            participantArray.forEach(person => {
                sharedCosts[person] += sharedPrice;
            });
        } else {
            individualCosts[item.name] += item.price;
        }
    });

    // 計算個人應付金額
    const finalCosts = participantArray.map(person => {
        return {
            person,
            total: sharedCosts[person] + individualCosts[person]
        };
    });

    // 輸出結果
    console.log("\n========== 用餐資訊 ==========");
    console.log(`日期: ${date}`);
    console.log(`地點: ${location}`);
    console.log("\n========== 消費清單 ==========");
    items.forEach(item => {
        console.log(`人名: ${item.name}, 餐點: ${item.itemName}, 單價: ${item.price.toFixed(2)}, ${item.isShared ? '均分' : '自付'}`);
    });
    console.log("\n========== 分帳結果 ==========");
    finalCosts.forEach(({ person, total }) => {
        console.log(`${person} 應付金額: ${total.toFixed(2)}`);
    });
    console.log(`\n總金額: ${total.toFixed(2)}`);

    rl.close();
}

dinnerSplitCalculator();
