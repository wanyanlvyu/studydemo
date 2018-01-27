window.addEventListener('load', function() {
    var category = new categoryObj();
    category.setCategoryHeight();
    category.leftSlide();
    category.rightSlide();
});


var categoryObj = function() {

}

categoryObj.prototype = {
    // 设置左侧和右侧的分类的高度
    setCategoryHeight: function() {
        window.addEventListener('resize', getHeight);
        getHeight();

        function getHeight() {
            // 1. 获取当前屏幕的高度
            var windowHeihgt = document.body.offsetHeight || document.documentElement.offsetHeight;
            console.log(windowHeihgt);
            // 2. 获取顶部通栏的高度
            var headerHeihgt = document.querySelector('#header').offsetHeight;
            // 3. 用屏幕高度-通栏高度 设置给左侧和右侧的分类
            var categoryHeihgt = windowHeihgt - headerHeihgt;
            document.querySelector('.category-left').style.height = categoryHeihgt + 'px';
            document.querySelector('.category-right').style.height = categoryHeihgt + 'px';
        }
    },
    // 分类左侧的滑动
    leftSlide: function() {
        // 1.1 记录滑动开始的Y
        var startY = 0;
        // 1.2 获取滑动的ul
        var slideUl = document.querySelector('.category-left ul');
        slideUl.addEventListener('touchstart', function(e) {
            startY = e.touches[0].clientY;
        });
        // 1.3 记录滑动中的Y
        var moveY = 0;
        // 1.4 记录滑动的距离Y
        var distanceY = 0;
        slideUl.addEventListener('touchmove', function(e) {
            moveY = e.touches[0].clientY;
            // 1.5 计算移动的距离 使用滑动中-滑动开始的位置
            distanceY = moveY - startY;
            // 2.4 判断当前的滑动的距离小于最大滑动范围 并且大于最小的滑动范围才允许滑动
            if ((currentY + distanceY) < maxSwipe && (currentY + distanceY) > minSwipe) {
                // 1.6 把距离设置到ul的位移上 设置位移的时候还要加上之前已经到达位置            
                slideUl.style.transform = 'translateY(' + (currentY + distanceY) + 'px)';
                // 3.7 在滑动的时候要清除过渡 因为弹回的时候添加了过渡
                slideUl.style.transition = 'none';
            }
        });
        // 2.1 记录最大滑动值
        var maxSwipe = 150 - 0;
        // 2.2 记录最小的滑动值
        var ulHeight = slideUl.offsetHeight;
        var parentHeight = slideUl.parentNode.offsetHeight;
        // 用父元素的高度-子元素的高度 -150px
        var minSwipe = parentHeight - ulHeight - 150;
        // 3.1 定义最大的位移值 ul和div顶部相连的时候
        var maxDistance = 0;
        // 3.2 定义最小的位置 ul和div底部相连的时候
        var minDistance = parentHeight - ulHeight;
        // 1.7 在滑动结束的时候记录之前滑动的距离
        var currentY = 0;
        slideUl.addEventListener('touchend', function(e) {
            currentY += distanceY;
            // 3.3 在滑动结束的时候 判断当前滑动的距离是否超过最大位移值 和 最小的位移值
            if (currentY > maxDistance) {
                // 3.4 设置位移回到最大位移的值
                slideUl.style.transform = 'translateY(' + maxDistance + 'px)';
                // 3.5 添加一个过渡效果慢慢回弹
                slideUl.style.transition = 'all 0.2s';
                // 3.6 当ul回到了最大位移值的时候下一次滑动的起点 从最大位移的位置开始
                currentY = maxDistance;
            }
            // 3.8 在滑动结束的时候 判断当前滑动的距离是否超过最大位移值 和 最小的位移值
            if (currentY < minDistance) {
                // 3.9 设置位移回到最大位移的值
                slideUl.style.transform = 'translateY(' + minDistance + 'px)';
                // 3.10 添加一个过渡效果慢慢回弹
                slideUl.style.transition = 'all 0.2s';
                // 3.11 当ul回到了最大位移值的时候下一次滑动的起点 从最大位移的位置开始
                currentY = minDistance;
            }
        });
        // 5.3 给所有的li添加索引号
        var lis = slideUl.querySelectorAll('li');
        for (var i = 0; i < lis.length; i++) {
            lis[i].index = i;
        }
        // 5.1 给左侧分类添加点击事件
        slideUl.addEventListener('click', function(e) {
            // e.target能够获取到真实被点击的子元素
            // console.log(e.target);//最里面点击到的子元素a
            // 5.2 通过e.target拿到a的父元素的li 获取到当前被点击的li
            var li = e.target.parentNode;
            for (var i = 0; i < lis.length; i++) {
                lis[i].classList.remove('active');
            }
            li.classList.add('active');
            // 5.4 计算当前点击的li需要的位移
            var liDistance = -li.index * li.offsetHeight;
            // 5.5 判断当前li要位移的值 是否小于最小的位移值
            if (liDistance < minDistance) {
                // 如果小于最小的位移值 就位移到最小的位移值 同时下一次滑动也要跟上
                currentY = minDistance;
            } else {
                // 如果没有小于最小的位移值 就使用计算位移值 current记录为计算的位移值
                currentY = liDistance;
            }
            // 5.6 把当前计算的位移设置给ul
            slideUl.style.transform = 'translateY(' + currentY + 'px)';
            // 5.7 添加过渡效果
            slideUl.style.transition = 'all 0.2s';
        });
    },
    // 分类右侧滑动
    rightSlide: function() {
        // 初始iscroll插件 传入父容器的选择器
        var myScroll = new IScroll('.category-right', {
            // 支持PC端的鼠标滚轮
            mouseWheel: true,
            // 是否添加滚动条
            // scrollbars: true
            // infiniteElements: '#scroller .row',
        });
    }
}
