import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LiquidEther = lazy(() => import("./LiquidEther"));

const imageWorks = [
  ["ai-brand-system.webp", "AI 品牌视觉系统"],
  ["ai-mixue-poster.webp", "AI 商业海报"],
  ["ai-tech-park.webp", "AI 科技建筑方案"],
  ["ai-changsha-travel.webp", "AI 文旅海报"],
  ["ai-ecommerce-detail.webp", "AI 电商详情视觉"],
  ["ai-art-ppt.webp", "AI 艺术创作应用场景"],
];

const videoWorks = [
  "ai-concert-optimized.mp4",
  "ai-lipstick-ad-optimized.mp4",
  "ai-orbit-camera-optimized.mp4",
  "ai-brand-film-optimized.mp4",
];

const aigcVideoWorks = [
  "aigc-day-night-timelapse.mp4",
  "aigc-camera-breakdown.mp4",
  "aigc-product-film.mp4",
  "aigc-wide-shot.mp4",
  "aigc-spielberg-shot.mp4",
  "aigc-hitchcock-zoom.mp4",
  "aigc-fpv-camera.mp4",
  "aigc-handheld-camera.mp4",
  "aigc-gaokao-girl-relay.mp4",
  "aigc-blend-change.mp4",
  "aigc-label-change.mp4",
  "aigc-light-change.mp4",
  "aigc-retouch-change.mp4",
  "aigc-remove-dog-food.mp4",
  "aigc-white-tshirt-replace.mp4",
  "aigc-world-cup-mv.mp4",
];

const topMarqueeWorks = [
  ...imageWorks.map(([file, alt]) => ({ type: "image", file, alt })),
  ...aigcVideoWorks.slice(0, 8).map((file) => ({ type: "video", file })),
];

const bottomMarqueeWorks = [
  ...videoWorks.map((file) => ({ type: "video", file })),
  ...aigcVideoWorks.slice(8).map((file) => ({ type: "video", file })),
];

const services = [
  ["01", "AI 视频内容全案", "从账号定位、选题、脚本、素材、剪辑到发布建议，帮助你把专业经验做成可传播的视频内容。"],
  ["02", "AIGC 创意视觉生产", "围绕生图、生视频和多模态工具，定制适合品牌与团队业务场景的视觉生产流程。"],
  ["03", "品牌视觉与内容包装", "从品牌调性、视觉风格、封面系统到传播物料，帮助项目建立更稳定的视觉识别。"],
  ["04", "企业 AI 创意培训", "面向市场、内容、设计和新媒体团队，拆解 AI 如何进入真实创意生产，而不是停留在工具演示。"],
];

const pricingPlans = [
  {
    name: "基础剪辑优化",
    note: "字幕 + 去气口 + 简单包装",
    rows: [
      ["30-60s", "300/条"],
      ["1-2min", "600/条"],
      ["2-3min", "600-800/条"],
      ["3min 以上", "200/min"],
    ],
  },
  {
    name: "精剪内容优化",
    note: "字幕 + 去气口 + 包装 + 素材",
    rows: [
      ["30-60s", "400/条"],
      ["1-2min", "800/条"],
      ["2-3min", "800-1000/条"],
      ["3min 以上", "300/min"],
    ],
  },
];

const deliveryRows = [
  ["60s 内", "12-48h"],
  ["1-3min", "48-72h"],
  ["3min 以上", "根据具体情况协商"],
];

function App() {
  useInteractiveEffects();
  usePortfolioAnimations();
  const showEther = useDeferredEther();

  return (
    <>
      <div className="liquid-bg" aria-hidden="true">
        <span className="blob blob-a" />
        <span className="blob blob-b" />
        <span className="blob blob-c" />
      </div>

      <header className="nav-glass">
        <a href="#top" className="brand-pill" aria-label="回到首页">
          <span>YH</span>
          <strong>一航</strong>
        </a>
        <nav aria-label="主导航">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        <Hero />
        <div className="post-hero-ether">
          {showEther && (
            <Suspense fallback={null}>
              <LiquidEther className="post-hero-ether-bg" colors={["#0b4dff", "#b7f8ff", "#ff4f9f"]} />
            </Suspense>
          )}
          <div className="post-hero-ether-shade" aria-hidden="true" />
          <div className="post-hero-content">
            <MarqueeWorks />
            <About />
            <Projects />
            <Services />
            <Pricing />
            <Method />
            <Contact />
          </div>
        </div>
      </main>
    </>
  );
}

function Hero() {
  return (
    <section className="hero-section">
      <video
        className="hero-background-video"
        src="/assets/videos/hero-background-optimized.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className="hero-background-mask" aria-hidden="true" />
      <div className="hero-kicker glass-pill">Visual Designer / AI Designer / Brand Designer</div>
      <h1 className="hero-heading">YIHANG</h1>

      <div className="hero-stage">
        <div className="portrait-glass magnetic-card">
          <video
            className="hero-profile-video"
            src="/assets/videos/yihang-hero-profile-optimized.mp4"
            muted
            autoPlay
            loop
            playsInline
            preload="auto"
          />
          <div className="portrait-caption">
            <span>Yihang Profile</span>
            <strong>AI Creative Design</strong>
          </div>
        </div>

        <div className="floating-card card-left glass-card">
          <span className="mini-label">Growth Case</span>
          <strong>3146</strong>
          <p>单条视频涨粉</p>
        </div>

        <div className="floating-card card-right glass-card">
          <span className="mini-label">Selected</span>
          <strong>+463.74%</strong>
          <p>转型后播放提升</p>
        </div>
      </div>

      <div className="hero-bottom">
        <p>
          我是潘煜航（一航），视觉设计师、AI 设计师、品牌设计师。用品牌审美、AIGC 视觉和内容系统，把想法变成更有质感、更可传播的视觉资产。
        </p>
        <a className="contact-button" href="#contact">Contact Me</a>
      </div>
    </section>
  );
}

function MarqueeWorks() {
  return (
    <section className="marquee-section" aria-label="作品滚动预览">
      <MarqueeRow className="row-right" direction={1} initialOffset={0.16}>
        <MediaTrack items={topMarqueeWorks} />
        <MediaTrack items={topMarqueeWorks} hidden />
      </MarqueeRow>
      <MarqueeRow className="row-left" direction={-1} initialOffset={0.52}>
        <MediaTrack items={bottomMarqueeWorks} />
        <MediaTrack items={bottomMarqueeWorks} hidden />
      </MarqueeRow>
    </section>
  );
}

function MarqueeRow({ children, className = "", direction = 1, initialOffset = 0 }) {
  const rowRef = useRef(null);
  const stateRef = useRef({
    isDown: false,
    isInteracting: false,
    startX: 0,
    startScrollLeft: 0,
    pauseTimer: 0,
  });

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return undefined;

    let frameId = 0;
    let lastTime = performance.now();
    const state = stateRef.current;

    const getLoopWidth = () => row.scrollWidth / 2;
    const normalizeScroll = () => {
      const loopWidth = getLoopWidth();
      if (!loopWidth) return;
      if (row.scrollLeft >= loopWidth) row.scrollLeft -= loopWidth;
      if (row.scrollLeft <= 0) row.scrollLeft += loopWidth;
    };
    const pauseAuto = () => {
      state.isInteracting = true;
      window.clearTimeout(state.pauseTimer);
      state.pauseTimer = window.setTimeout(() => {
        state.isInteracting = false;
      }, 900);
    };

    const setInitialPosition = () => {
      const loopWidth = getLoopWidth();
      row.scrollLeft = Math.max(1, loopWidth * initialOffset);
    };

    const onWheel = (event) => {
      if (Math.abs(event.deltaX) < 1 && Math.abs(event.deltaY) < 1) return;
      event.preventDefault();
      pauseAuto();
      row.scrollLeft += event.deltaX + event.deltaY;
      normalizeScroll();
    };

    const onPointerDown = (event) => {
      state.isDown = true;
      state.startX = event.clientX;
      state.startScrollLeft = row.scrollLeft;
      row.classList.add("is-dragging");
      row.setPointerCapture(event.pointerId);
      pauseAuto();
    };

    const onPointerMove = (event) => {
      if (!state.isDown) return;
      event.preventDefault();
      row.scrollLeft = state.startScrollLeft - (event.clientX - state.startX);
      normalizeScroll();
    };

    const stopDrag = (event) => {
      if (!state.isDown) return;
      state.isDown = false;
      row.classList.remove("is-dragging");
      if (row.hasPointerCapture(event.pointerId)) row.releasePointerCapture(event.pointerId);
      pauseAuto();
    };

    const tick = (time) => {
      const delta = time - lastTime;
      lastTime = time;
      if (!state.isInteracting && !state.isDown) {
        row.scrollLeft += direction * (delta * 0.035);
        normalizeScroll();
      }
      frameId = window.requestAnimationFrame(tick);
    };

    const initialFrame = window.requestAnimationFrame(setInitialPosition);
    frameId = window.requestAnimationFrame(tick);
    row.addEventListener("wheel", onWheel, { passive: false });
    row.addEventListener("pointerdown", onPointerDown);
    row.addEventListener("pointermove", onPointerMove);
    row.addEventListener("pointerup", stopDrag);
    row.addEventListener("pointercancel", stopDrag);
    row.addEventListener("pointerleave", stopDrag);

    return () => {
      window.cancelAnimationFrame(initialFrame);
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(state.pauseTimer);
      row.removeEventListener("wheel", onWheel);
      row.removeEventListener("pointerdown", onPointerDown);
      row.removeEventListener("pointermove", onPointerMove);
      row.removeEventListener("pointerup", stopDrag);
      row.removeEventListener("pointercancel", stopDrag);
      row.removeEventListener("pointerleave", stopDrag);
    };
  }, [direction, initialOffset]);

  return (
    <div ref={rowRef} className={`marquee-row ${className}`} tabIndex={0}>
      {children}
    </div>
  );
}

function MediaTrack({ items, hidden = false }) {
  return (
    <div className="marquee-track" aria-hidden={hidden}>
      {items.map((item) => (
        item.type === "image"
          ? <img key={`${item.file}-${hidden}`} src={`/assets/images/${item.file}`} alt={hidden ? "" : item.alt} loading="lazy" decoding="async" />
          : <video key={`${item.file}-${hidden}`} data-src={`/assets/videos/${item.file}`} muted loop playsInline preload="none" />
      ))}
    </div>
  );
}

function About() {
  return (
    <section id="about" className="about-section">
      <div className="glass-orbit orbit-a">AI</div>
      <div className="glass-orbit orbit-b">3D</div>
      <div className="section-title about-title">
        <span>About Me</span>
        <h2>把想法做成好看的画面，也做成能用的内容。</h2>
      </div>
      <p className="about-copy">
        我是一航，做视觉设计、AI 视觉和品牌内容包装。比起堆概念，我更在意一件事：一个产品、一项服务或者一个账号，最后能不能被人一眼看懂、愿意停下来看，并且记住它。
      </p>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="services-section">
      <div className="section-title dark-title">
        <span>Services</span>
        <h2>交付能力</h2>
      </div>
      <div className="service-list">
        {services.map(([num, title, text]) => (
          <article key={num}>
            <span>{num}</span>
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="pricing-section">
      <div className="pricing-shell">
        <div className="pricing-intro">
          <span>Pricing</span>
          <h2>不只是剪辑，是让口播内容更好看、更好懂、更容易留下来。</h2>
          <p>
            你负责出镜和表达，我负责把脚本结构、视频节奏、字幕包装、素材补充和画面质感一起优化。最后交付的不是一条“剪完的视频”，而是一条更适合发布和测试数据的内容。
          </p>
          <div className="pricing-flow">
            <strong>开始方式</strong>
            {["确认需求", "支付 30% 定金", "初版预览", "满意后付尾款", "发送高清原文件"].map((step, index) => (
              <span key={step}>
                <em>{String(index + 1).padStart(2, "0")}</em>
                {step}
              </span>
            ))}
          </div>
        </div>

        <div className="pricing-cards">
          {pricingPlans.map((plan) => (
            <article className="pricing-card" key={plan.name}>
              <div>
                <span>{plan.note}</span>
                <h3>{plan.name}</h3>
              </div>
              <div className="price-table">
                {plan.rows.map(([duration, price]) => (
                  <div key={`${plan.name}-${duration}`}>
                    <span>{duration}</span>
                    <strong>{price}</strong>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="delivery-card">
          <div className="delivery-head">
            <span>Delivery Time</span>
            <h3>交付周期</h3>
          </div>
          <div className="delivery-list">
            {deliveryRows.map(([duration, time]) => (
              <div key={duration}>
                <span>{duration}</span>
                <strong>{time}</strong>
              </div>
            ))}
          </div>
          <div className="delivery-note">
            <strong>正式排期以前，会先确认素材状态和优化幅度。</strong>
            <p>如果需要补素材、重做结构或增加包装，周期会根据复杂度调整；急单可以提前说明，我会判断是否能插队处理。</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Method() {
  return (
    <section className="method-section" aria-label="交付方法">
      <div className="method-shell">
        <div className="method-copy">
          <span>Delivery Method</span>
          <h2>把 AI 创意能力，变成能被团队复用的设计系统。</h2>
          <p>
            合作不只停留在工具演示。我会先判断品牌目标、视觉场景和内容生产瓶颈，再组合模型、流程、素材规范与复盘机制，让 AI 真正进入设计和内容交付。
          </p>
        </div>
        <div className="method-grid">
          <article><strong>01</strong><h3>定位诊断</h3><p>梳理品牌、产品、账号状态和目标受众，找到最适合视觉化的表达方向。</p></article>
          <article><strong>02</strong><h3>模型选型</h3><p>根据视觉风格、视频类型、成本和交付周期，选择合适的生图 / 生视频模型组合。</p></article>
          <article><strong>03</strong><h3>样片验证</h3><p>先做可观看、可比较的样片，用真实反馈校准画面、节奏、封面和包装。</p></article>
          <article><strong>04</strong><h3>系统沉淀</h3><p>把选题、脚本、素材、视觉规范和数据复盘沉淀进工作流，形成可持续资产。</p></article>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="projects-section">
      <div className="section-title">
        <span>Projects</span>
        <h2>Project Stack</h2>
      </div>

      <div className="project-stack">
        <article className="project-card glass-project" data-index="0">
          <div className="project-head">
            <strong>01</strong>
            <span>Growth / Account</span>
            <h3>彬彬 AI 实战圈增长案例</h3>
            <a href="#contact">Work With Me</a>
          </div>
          <div className="project-media project-data-layout">
            <div className="video-abstract-card">
              <span className="date">2026.04.08</span>
              <h4>AI 邪修出服装带货图片 + 视频</h4>
              <p>教程型 AI 工具内容，通过结果展示、封面包装和清晰卖点转化为短视频增长资产。</p>
            </div>
            <div className="media-main metric-panel compact no-note">
              <div><span>播放</span><strong>19.9 万</strong></div>
              <div><span>点赞</span><strong>9455</strong></div>
              <div><span>评论</span><strong>204</strong></div>
              <div><span>分享</span><strong>2445</strong></div>
              <div><span>涨粉</span><strong>3146</strong></div>
            </div>
          </div>
        </article>

        <article className="project-card glass-project" data-index="1">
          <div className="project-head">
            <strong>02</strong>
            <span>AIGC / Video</span>
            <h3>AI 创意视频实验集</h3>
            <a href="#contact">Creative Project</a>
          </div>
          <div className="project-media">
            <div className="media-column">
              <video data-src="/assets/videos/ai-lipstick-ad-optimized.mp4" muted loop playsInline preload="none" />
              <video data-src="/assets/videos/ai-orbit-camera-optimized.mp4" muted loop playsInline preload="none" />
            </div>
            <video className="media-main" data-src="/assets/videos/ai-concert-optimized.mp4" muted loop playsInline preload="none" />
          </div>
        </article>

        <article className="project-card glass-project" data-index="2">
          <div className="project-head">
            <strong>03</strong>
            <span>AIGC / Visual</span>
            <h3>商业视觉与宣发设计</h3>
            <a href="#contact">Visual System</a>
          </div>
          <div className="project-media">
            <div className="media-column">
              <img src="/assets/images/ai-brand-system.webp" alt="品牌视觉系统" loading="lazy" decoding="async" />
              <img src="/assets/images/ai-art-ppt.webp" alt="AI 艺术创作场景 PPT" loading="lazy" decoding="async" />
            </div>
            <img className="media-main" src="/assets/images/ai-mixue-poster.webp" alt="茶饮商业海报" loading="lazy" decoding="async" />
          </div>
        </article>

        <article className="project-card glass-project" data-index="3">
          <div className="project-head">
            <strong>04</strong>
            <span>Workflow / Content Flywheel</span>
            <h3>AI 内容飞轮系统实践</h3>
            <a href="#contact">Content System</a>
          </div>
          <div className="flywheel-ui">
            <div className="glass-sidebar">
              <span>素材库</span><span>选题池</span><span>脚本库</span><span>已发布</span>
            </div>
            <div className="glass-document">
              <h4>从素材到视频交付</h4>
              <p>素材沉淀 -&gt; 选题判断 -&gt; 脚本生成 -&gt; 视频交付 -&gt; 数据复盘 -&gt; 系统迭代</p>
              <div className="flow-dots"><span /><span /><span /><span /><span /></div>
            </div>
          </div>
        </article>

        <article className="project-card glass-project" data-index="4">
          <div className="project-head">
            <strong>05</strong>
            <span>Selected / Packaging</span>
            <h3>账号转型后首次上抖音精选</h3>
            <a href="#contact">Content Upgrade</a>
          </div>
          <div className="project-media project-data-layout">
            <div className="video-abstract-card selected-card">
              <span className="date">2026.06.10</span>
              <h4>8 种 AI 首尾帧出大片合集</h4>
              <p>账号转型后首次进入抖音精选。重点呈现精选结果、播放提升和内容包装升级。</p>
              <div className="selected-badge">抖音精选计划</div>
            </div>
            <div className="media-main metric-panel compact warm no-note selected-metrics">
              <div><span>较往期播放</span><strong>+463.74%</strong></div>
              <div><span>收藏</span><strong>705</strong></div>
              <div><span>精选流量扶持</span><strong>6064</strong></div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-panel glass-card">
        <div className="contact-copy">
          <span className="mini-label">Contact</span>
          <h2>需要视觉设计、AI 创意生产或品牌内容包装，可以聊聊。</h2>
          <p>可以把你的产品、账号、项目背景和想要呈现的效果发给我，我会先判断适合做成什么样的视觉内容。</p>
          <div className="contact-actions">
            <a className="contact-button" href="mailto:panyuhang8881@163.com">Send Email</a>
            <a className="email-link" href="mailto:panyuhang8881@163.com">panyuhang8881@163.com</a>
          </div>
        </div>

        <div className="wechat-card">
          <span>WeChat</span>
          <img src="/assets/images/wechat-qr.jpg" alt="一航微信二维码" />
          <p>扫码添加微信</p>
        </div>
      </div>
    </section>
  );
}

function useDeferredEther() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (isReady) return undefined;
    let timerId;
    let idleId;
    const load = () => setIsReady(true);

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(load, { timeout: 2600 });
    } else {
      timerId = window.setTimeout(load, 2200);
    }

    return () => {
      if (idleId) window.cancelIdleCallback(idleId);
      if (timerId) window.clearTimeout(timerId);
    };
  }, [isReady]);

  return isReady;
}

function useInteractiveEffects() {
  useEffect(() => {
    const playVideo = (video) => {
      if (!video) return;
      if (video.dataset.src && !video.currentSrc) {
        video.src = video.dataset.src;
        video.load();
      }
      const play = video.play();
      if (play && typeof play.catch === "function") play.catch(() => {});
    };

    const lazyVideoObserver = "IntersectionObserver" in window
      ? new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const video = entry.target;
            if (!entry.isIntersecting) {
              video.pause();
              return;
            }
            playVideo(video);
          });
        },
        { rootMargin: "900px 0px", threshold: 0.01 },
      )
      : null;

    const lazyVideos = [...document.querySelectorAll("video[data-src]")];
    lazyVideos.forEach((video) => {
      if (lazyVideoObserver) lazyVideoObserver.observe(video);
      else playVideo(video);
    });

    [...document.querySelectorAll("video:not([data-src])")].forEach(playVideo);

    return () => {
      if (lazyVideoObserver) lazyVideoObserver.disconnect();
    };
  }, []);
}

function usePortfolioAnimations() {
  useLayoutEffect(() => {
    ScrollTrigger.refresh();
    return undefined;
  }, []);
}

export default App;
