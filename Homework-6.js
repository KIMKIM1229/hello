// 聚餐分帳計算器
function diningBillSplitter() {
    // 建立用餐資訊
    const diningInfo = {
        date: "2024-03-21",
        location: "Happy Restaurant",
    };

    // 記錄點餐項目與金額
    const orders = [
        { name: "Alice", item: "chicken rice", price: 60, share: true },
        { name: "Ray", item: "Pasta", price: 50, share: true },
        { name: "Charlie", item: "Drink", price: 30, share: false },
        { name: "Man", item: "Drink", price: 35, share: false },
    ];

    // 計算功能
    let sharedTotal = 0; // 均分的金額總和
    let individualCosts = {}; // 每人實際應付金額

    orders.forEach((order) => {
        if (order.share) {
            sharedTotal += order.price;
        } else {
            individualCosts[order.name] = (individualCosts[order.name] || 0) + order.price;
        }
    });

    const sharedPerPerson = sharedTotal / new Set(orders.map((o) => o.name)).size; // 平均分配均分金額

    orders.forEach((order) => {
        if (!order.share) return;
        individualCosts[order.name] = (individualCosts[order.name] || 0) + sharedPerPerson;
    });

    // 計算總金額
    const totalAmount = orders.reduce((sum, order) => sum + order.price, 0);

    // 格式化輪出
console.log(`日期: ${formatDate(diningInfo.date)}`);    
console.log(`地點: ${ diningInfo.location }`);
console.log("\n--- 詳細清單 ---");
orders.forEach((order) => {
    console.log(
        `${order.name} 點了 ${order.item} ($${order.price}) ${order.share ? "[均分]" : "[個人支付]"
        }`
    );
});

console.log("\n--- 分帳結果 ---");
Object.keys(individualCosts).forEach((name) => {
    console.log(`${name} 應付: $${individualCosts[name].toFixed(2)}`);

console.log(`\n總金額: $${ totalAmount.toFixed(2) }`);


// 日期格式化功能
function formatDate(dateString) {
    const [year, month, day] = dateString.split("-");
    return`${year}/${month}/${day}`;
}

// 執行計算器
diningBillSplitter() ;