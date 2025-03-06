// 小宇宙播客应用通用 JavaScript 功能

// 更新状态栏时间
function updateStatusBarTime() {
    const timeElement = document.querySelector('.status-bar .time');
    if (timeElement) {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes}`;
    }
}

// 初始化状态栏时间并每分钟更新一次
function initStatusBarTime() {
    updateStatusBarTime();
    setInterval(updateStatusBarTime, 60000);
}

// 底部导航栏激活状态
function setActiveTab(tabName) {
    const tabItems = document.querySelectorAll('.tab-item');
    tabItems.forEach(item => {
        if (item.getAttribute('data-tab') === tabName) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// 模拟播放进度条更新
function updatePlayerProgress(progressBar, currentTimeElement, durationElement, currentSeconds, totalSeconds) {
    if (progressBar && currentTimeElement && durationElement) {
        // 更新进度条宽度
        const progressPercent = (currentSeconds / totalSeconds) * 100;
        progressBar.style.width = `${progressPercent}%`;
        
        // 更新时间显示
        const currentMinutes = Math.floor(currentSeconds / 60);
        const currentRemainingSeconds = Math.floor(currentSeconds % 60);
        currentTimeElement.textContent = `${currentMinutes}:${currentRemainingSeconds.toString().padStart(2, '0')}`;
        
        const totalMinutes = Math.floor(totalSeconds / 60);
        const totalRemainingSeconds = Math.floor(totalSeconds % 60);
        durationElement.textContent = `${totalMinutes}:${totalRemainingSeconds.toString().padStart(2, '0')}`;
    }
}

// 模拟播放状态切换
function togglePlayState(playButton) {
    if (playButton) {
        const isPlaying = playButton.getAttribute('data-playing') === 'true';
        if (isPlaying) {
            playButton.innerHTML = '<i class="fas fa-play"></i>';
            playButton.setAttribute('data-playing', 'false');
        } else {
            playButton.innerHTML = '<i class="fas fa-pause"></i>';
            playButton.setAttribute('data-playing', 'true');
        }
    }
}

// 模拟订阅状态切换
function toggleSubscribeState(subscribeButton) {
    if (subscribeButton) {
        const isSubscribed = subscribeButton.classList.contains('subscribed-btn');
        if (isSubscribed) {
            subscribeButton.classList.remove('subscribed-btn');
            subscribeButton.innerHTML = '<i class="fas fa-plus"></i> 订阅';
        } else {
            subscribeButton.classList.add('subscribed-btn');
            subscribeButton.innerHTML = '<i class="fas fa-check"></i> 已订阅';
        }
    }
}

// 模拟点赞状态切换
function toggleLikeState(likeButton) {
    if (likeButton) {
        const isLiked = likeButton.classList.contains('text-primary');
        if (isLiked) {
            likeButton.classList.remove('text-primary');
            likeButton.classList.add('text-light');
        } else {
            likeButton.classList.remove('text-light');
            likeButton.classList.add('text-primary');
        }
    }
}

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    // 初始化状态栏时间
    initStatusBarTime();
    
    // 设置当前页面的激活标签
    const currentPage = document.body.getAttribute('data-page');
    if (currentPage) {
        setActiveTab(currentPage);
    }
    
    // 为所有播放按钮添加点击事件
    const playButtons = document.querySelectorAll('.play-btn');
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            togglePlayState(this);
        });
    });
    
    // 为所有订阅按钮添加点击事件
    const subscribeButtons = document.querySelectorAll('.subscribe-btn');
    subscribeButtons.forEach(button => {
        button.addEventListener('click', function() {
            toggleSubscribeState(this);
        });
    });
    
    // 为所有点赞按钮添加点击事件
    const likeButtons = document.querySelectorAll('.like-btn');
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            toggleLikeState(this);
        });
    });
    
    // 模拟播放进度更新（如果在播放页面）
    const progressBar = document.querySelector('.player-progress-bar');
    const currentTimeElement = document.querySelector('.current-time');
    const durationElement = document.querySelector('.duration');
    
    if (progressBar && currentTimeElement && durationElement) {
        // 模拟一个 5 分钟的音频，当前播放到 1 分 30 秒
        const totalSeconds = 5 * 60;
        let currentSeconds = 1 * 60 + 30;
        
        // 初始更新一次
        updatePlayerProgress(progressBar, currentTimeElement, durationElement, currentSeconds, totalSeconds);
        
        // 每秒更新一次进度（模拟播放）
        setInterval(function() {
            if (document.querySelector('.play-btn').getAttribute('data-playing') === 'true') {
                currentSeconds += 1;
                if (currentSeconds > totalSeconds) {
                    currentSeconds = 0;
                }
                updatePlayerProgress(progressBar, currentTimeElement, durationElement, currentSeconds, totalSeconds);
            }
        }, 1000);
    }
}); 