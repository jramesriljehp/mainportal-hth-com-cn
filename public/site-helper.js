// public/site-helper.js

const SiteHelper = (function () {
  const siteUrl = "https://mainportal-hth.com.cn";
  const mainKeyword = "华体会";

  const tips = [
    "点击徽章可以快速查看官网活动",
    "每日签到可获得额外积分",
    "关键词帮助您准确找到服务入口",
    "页面提示卡片支持拖拽和关闭",
  ];

  const badges = [
    { label: "华体会", color: "#e74c3c" },
    { label: "官网", color: "#2ecc71" },
    { label: "活动", color: "#f39c12" },
    { label: "下载", color: "#3498db" },
  ];

  let shownTips = 0;
  const MAX_TIPS = 3;

  function createTipCard() {
    if (shownTips >= MAX_TIPS) return;
    const card = document.createElement("div");
    card.className = "site-tip-card";
    const idx = Math.floor(Math.random() * tips.length);
    card.textContent = `💡 ${tips[idx]}`;
    Object.assign(card.style, {
      position: "fixed",
      bottom: `${20 + shownTips * 80}px`,
      right: "20px",
      background: "#fff",
      border: "1px solid #ddd",
      borderRadius: "12px",
      padding: "12px 20px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      zIndex: 9999,
      fontSize: "14px",
      cursor: "pointer",
      maxWidth: "300px",
      transition: "opacity 0.3s",
    });
    card.addEventListener("click", () => {
      card.style.opacity = "0";
      setTimeout(() => card.remove(), 300);
      shownTips++;
    });
    document.body.appendChild(card);
  }

  function renderBadges(container) {
    if (!container) return;
    badges.forEach((badge) => {
      const span = document.createElement("span");
      span.textContent = badge.label;
      Object.assign(span.style, {
        display: "inline-block",
        background: badge.color,
        color: "#fff",
        borderRadius: "16px",
        padding: "4px 14px",
        margin: "4px 6px",
        fontSize: "13px",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "transform 0.2s",
      });
      span.addEventListener("mouseenter", () => {
        span.style.transform = "scale(1.08)";
      });
      span.addEventListener("mouseleave", () => {
        span.style.transform = "scale(1)";
      });
      span.addEventListener("click", () => {
        alert(`您选择了关键词：${badge.label}，即将跳转至 ${siteUrl}`);
      });
      container.appendChild(span);
    });
  }

  function showAccessInfo() {
    const info = document.createElement("div");
    info.className = "access-info";
    info.textContent = `欢迎使用${mainKeyword}服务，官网地址：${siteUrl}`;
    Object.assign(info.style, {
      position: "fixed",
      top: "10px",
      left: "50%",
      transform: "translateX(-50%)",
      background: "#2c3e50",
      color: "#ecf0f1",
      padding: "10px 24px",
      borderRadius: "30px",
      fontSize: "14px",
      zIndex: 10000,
      boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
    });
    document.body.appendChild(info);
    setTimeout(() => {
      info.style.opacity = "0";
      setTimeout(() => info.remove(), 300);
    }, 5000);
  }

  function init() {
    showAccessInfo();
    setTimeout(createTipCard, 2000);
    setTimeout(createTipCard, 5000);
    setTimeout(createTipCard, 8000);
    const badgeContainer = document.getElementById("keyword-badges");
    if (badgeContainer) {
      renderBadges(badgeContainer);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  return {
    createTipCard,
    renderBadges,
    showAccessInfo,
  };
})();