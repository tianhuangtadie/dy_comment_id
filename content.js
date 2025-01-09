// 创建自定义上下文菜单的 DOM 元素
const contextMenu = document.createElement("div");
contextMenu.style.position = "absolute";
contextMenu.style.zIndex = "10000";
contextMenu.style.backgroundColor = "#fff";
contextMenu.style.border = "1px solid #ccc";
contextMenu.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
contextMenu.style.padding = "8px";
contextMenu.style.borderRadius = "4px";
contextMenu.style.display = "none";
document.body.appendChild(contextMenu);

// 添加菜单选项
const copyOption = document.createElement("div");
copyOption.textContent = "复制信息";
copyOption.style.cursor = "pointer";
copyOption.style.padding = "4px 8px";
copyOption.addEventListener("mouseover", () => (copyOption.style.backgroundColor = "#f0f0f0"));
copyOption.addEventListener("mouseout", () => (copyOption.style.backgroundColor = "transparent"));
contextMenu.appendChild(copyOption);

// 条件判断函数（可根据需求自定义条件）
function isNodeEligible(target) {
    return target.id.includes("tooltip_");
}

// 监听右键点击事件
let currentTarget = null; // 存储右键点击的目标节点
document.addEventListener("contextmenu", (event) => {
    const target = event.target;

    // 判断节点是否满足条件
    if (isNodeEligible(target)) {
        event.preventDefault(); // 阻止默认右键菜单
        currentTarget = target; // 保存当前右键点击的节点

        // 获取鼠标点击位置
        const mouseX = event.pageX;
        const mouseY = event.pageY;

        // 获取菜单尺寸
        const menuWidth = contextMenu.offsetWidth || 150; // 默认宽度
        const menuHeight = contextMenu.offsetHeight || 50; // 默认高度

        // 获取窗口尺寸
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // 调整菜单位置，避免溢出
        let adjustedX = mouseX;
        let adjustedY = mouseY;

        if (mouseX + menuWidth > windowWidth) {
            adjustedX = windowWidth - menuWidth - 10; // 距离右侧留 10px
        }
        if (mouseY + menuHeight > windowHeight) {
            adjustedY = windowHeight - menuHeight - 10; // 距离底部留 10px
        }

        // 设置菜单位置并显示
        contextMenu.style.left = `${adjustedX}px`;
        contextMenu.style.top = `${adjustedY}px`;
        contextMenu.style.display = "block";
    } else {
        // 如果不满足条件，隐藏自定义菜单，并允许默认右键菜单显示
        contextMenu.style.display = "none";
        currentTarget = null;
    }
});

// 隐藏上下文菜单
document.addEventListener("click", () => {
    contextMenu.style.display = "none";
});

// 点击“复制信息”时的逻辑
copyOption.addEventListener("click", () => {
    if (currentTarget) {
        const nodeInfo = {
            nodeName: currentTarget.nodeName,
            id: currentTarget.id || "无",
            className: currentTarget.className || "无",
            outerHTML: currentTarget.outerHTML
        };

        const rawId = currentTarget.id; // 原始 ID
        const cleanedId = rawId.replace("tooltip_", "");
        // 复制到剪切板
        navigator.clipboard.writeText(cleanedId).then(() => {
            alert("节点信息已复制到剪切板！");
        }).catch((err) => {
            console.error("复制失败:", err);
        });

        // 隐藏菜单
        contextMenu.style.display = "none";
    }
});