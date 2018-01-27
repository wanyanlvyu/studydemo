/*1. JS代码的选择器尽量使用HTML querySelector() querySelectorAll()
2. 添加事件用 addEventListener()
3. 尽量每个功能区分一个函数（功能块）*/
window.addEventListener('load', function() {
    /*实例化构造函数的对象*/
    var jdeffect = new jdEffect();
    jdeffect.searchGradient();
    jdeffect.countDown();
    jdeffect.slide();
});

// function searchGradient() {

// }

// function countDown() {

// }

// function slide() {

// }
/*构造函数*/
var jdEffect = function() {

    }
    /*搜索框渐变*/
    /*jdEffect.searchGradient = function () {
        
    }*/
    /*倒计时效果*/
    /*jdEffect.countDown = function(){

    }*/
    // 轮播图
    /*jdEffect.slide = function () {
        
    }*/

jdEffect.prototype = {
    // 搜索框渐变
    searchGradient: function() {
        opacity();
        window.addEventListener('scroll', opacity);

        function opacity() {
            // 1. 获取滚动条的距离
            var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            // 2. 获取轮播图的高度
            var slideHeight = document.querySelector('#slide').offsetHeight;
            var header = document.querySelector('#header');
            // 3. 如果滚动的距离小于高度就计算透明度
            if (scrollTop < slideHeight) {
                var opacity = scrollTop / slideHeight * 0.8;
                header.style.backgroundColor = 'rgba(255,0,0,' + opacity + ')';
            } else {
                // 固定透明度为0.8
                header.style.backgroundColor = 'rgba(255,0,0,0.8)';
            }
        }
    },
    // 倒计时效果
    countDown: function() {
        /*定义一个秒杀时间范围
        比如是8点场8:00-10:00  之间 比如当前时间是8:00就还剩2小时 如果9:00就还剩一小时
        截止时间 -  当前时间  == 倒计时的时间*/
        /*定义一个定时器 让倒计时时间每秒--
        分别计算当前减完之后的倒计时时间的时分秒 分别设置到对应的span*/
        // 0-11 0就表示1月
        var futureDate = new Date(2018, 0, 24, 12, 00, 00).getTime(); //new Date(参数)可以指定一个要获取的时间
        // console.log(futureDate);
        var nowDate = new Date().getTime(); //getTime()可以获取时间的毫秒数 从1970.1.1-当前时间的毫秒数
        /*获取所有倒计时的标签*/
        var spans = document.querySelectorAll('.seckill-count-down span');
        // console.log(nowDate);
        // 倒计时的时间  == 未来时间 -  当前的时间  秒数
        var time = Math.floor((futureDate - nowDate) / 1000);
        var timeId = setInterval(countdown, 1000);
        countdown();

        function countdown() {
            time--;
            if (time <= 0) {
                // 当时间到0了之后清除定时器
                clearInterval(timeId);
                // 把时间重置为0
                time = 0;
            }
            /*1分钟 60 秒 1小时 60分  1小时== 60*60（3600秒）
            3600 / 3600 == 1
            7200 / 3600 == 2*/
            var hour = Math.floor(time / 3600);
            /*1 分钟= 60秒  60 == 1分钟
            60 / 60 == 1
            120 / 60 == 2
            3660 / 60 == 61    1
            71 % 60 == 11
            time / 60 % 60
            3660 % 3600 ==   60
            60 / 60 == 1
            time % 3600 / 60*/
            var minute = Math.floor(time / 60 % 60);
            // 40 % 60 == 40
            // 100 % 60 = 40
            // 3640 % 60 = 40
            // time % 60 == 秒数
            var second = Math.floor(time % 60);
            // 小时的十位
            spans[0].innerHTML = Math.floor(hour / 10);
            // 小时的个位
            spans[1].innerHTML = Math.floor(hour % 10);
            // 分钟的十位
            spans[3].innerHTML = Math.floor(minute / 10);
            // 分钟的个位
            spans[4].innerHTML = Math.floor(minute % 10);
            // 秒的十位
            spans[6].innerHTML = Math.floor(second / 10);
            // 秒的个位
            spans[7].innerHTML = Math.floor(second % 10);
        }
    },
    // 轮播图
    slide: function() {
        /* 1. 实现轮播图的无缝轮播
             1. 定义一个当前轮播图的索引
             2. 定义一个定时器 索引++
             3. 设置当前索引的位移
             4. 设置过渡属性
             5. 判断如果索引从第8张到第1张切换完成 跳回第一张的位置（不加过渡 迅速回去）*/
        // 1. 获取轮播图图片容器
        var slideUl = document.querySelector('#slide ul');
        // 2. 获取轮播图的大容器宽度（一张图的宽度）
        var slideWidth = document.querySelector('#slide').offsetWidth;
        // 3. 定义一个轮播图的索引 索引为1因为轮播图本身有了一张图片的偏移        
        var index = 1;
        var timeId = null;
        startTime();
        function startTime() {
            // 4. 定义一个定时器 每秒索引++
            timeId = setInterval(function() {
                // 5. 在定时器里面索引++
                index++;
                // 6. 计算当前索引 需要位移的距离  -当前索引*一张图的宽度 设置到轮播图ul 带上单位
                slideUl.style.transform = 'translateX(' + (-index * slideWidth) + 'px)';
                // 7. 给ul添加过渡的属性 all 0.2s  注意要带单位0.2s  或者 200ms 但是注意过渡时间一定要小于定时器的时间
                slideUl.style.transition = 'all 0.6s';
                // 8. 判断当前索引是从第8张切换到第一张 (判断要等到第8张到第一张过渡完成后才执行判断)
                // 当前第8张到第一张的切换过渡完成了之后就马上判断 让当前ul位移回到第一张           
                //设置一个定时器 等0.4s过渡完成了之后马上回到第一张
                // setTimeout(function() {
                //     if (index == 9) {
                //         // 9. 就设置回到第一张的真实索引
                //         index = 1;
                //         // 10. 设置轮播图位移
                //         slideUl.style.transform = 'translateX(' + (-index * slideWidth) + 'px)';
                //         // 11. 清除过渡 （迅速回去要清除过渡）
                //         slideUl.style.transition = 'none';
                //     }
                // }, 600);
            }, 1000);
        }
        // 2.1 获取轮播图的所有小圆点
        var indicators = document.querySelectorAll('#slide ol li');
        // CSS3有一个过渡完成事件 而且这是事件必须使用addEventListener 添加因为CSS3的事件
        // 8. 添加一个过渡完成的事件（等第8张切换到第一张过渡完成之后再执行判断回去）
        slideUl.addEventListener('transitionend', function() {
            if (index >= 9) {
                // 9. 就设置回到第一张的真实索引
                index = 1;
                // 10. 设置轮播图位移
                slideUl.style.transform = 'translateX(' + (-index * slideWidth) + 'px)';
                // 11. 清除过渡 （迅速回去要清除过渡）
                slideUl.style.transition = 'none';
            }
            // 4.4 判断当前索引是从第1张往左滑动到第8 张
            if (index <= 0) {
                // 4.5设置回到第8张的真实索引
                index = 8;
                // 4.6. 设置轮播图位移
                slideUl.style.transform = 'translateX(' + (-index * slideWidth) + 'px)';
                // 4.7. 清除过渡 （迅速回去要清除过渡）
                slideUl.style.transition = 'none';
            }
            // 2.2 删除所有小圆点的active类名
            for (var i = 0; i < indicators.length; i++) {
                indicators[i].classList.remove('active');
            }
            // 2.3 给当前索引对应的小圆点添加active类名
            indicators[index - 1].classList.add('active');
            // 当执行完了过渡完成事件的时候就表示过渡执行完了 
            isTransitonend = true;
        });

        // 3.1 定义滑动开始的X 
        var startX = 0;
        slideUl.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            // 3.5 滑动的时候清除定时器
            clearInterval(timeId);
        });
        // 3.2 定义滑动中的X
        var moveX = 0;
        // 3.3 定义滑动的距离X
        var distanceX = 0;
        slideUl.addEventListener('touchmove', function(e) {
            // 当过渡完了之后就允许滑动
            if(isTransitonend){
                moveX = e.touches[0].clientX;
                distanceX = moveX - startX;
                // 3.4 把滑动距离设置到轮播图的位移 要加上轮播图已经到达的位置
                slideUl.style.transform = 'translateX(' + ((-index * slideWidth) + distanceX) + 'px)';
                // 3.6 滑动的时候不要添加过渡效果
                slideUl.style.transition = 'none';
            }
        });

        /* 4. 当松开手的时候判断当前滑动的距离 如果超过1/3就翻页  否则就回弹
             翻页就判断当前滑动的距离是正值还是负值 正值 从左往右滑 切换到上一张图片 index--
             如果是负值 从右往左滑 切换到下一张  index++*/
        // 4.1 添加滑动结束的事件
        slideUl.addEventListener('touchend', function() {
            // 4.2取当前滑动的距离的绝对值判断 是否大于1/3
            if (Math.abs(distanceX) > slideWidth / 3) {
                // 如果大于1/3就判断值是正还是负值
                if (distanceX > 0) {
                    index--;
                } else {
                    index++;
                }
            }
            // 4.3 当变化索引后设置位移和过渡
            slideUl.style.transform = 'translateX(' + (-index * slideWidth) + 'px)';
            slideUl.style.transition = 'all 0.6s';
            // 这个时候因为过渡还没有走完isTransitionend = false
            isTransitonend = false;
            // 4.8 当滑动结束后重新添加时钟
            startTime();
            // 当滑动结束的时候把之前的值清空 防止下一张滑动使用到之前的值
            startX = 0;
            moveX = 0;
            distanceX = 0;
        });

        // 5. 添加一个限制 当过渡完成了之后才能进行下一次的滑动
        // 默认过渡是完成了的
        var isTransitonend = true;
    }
}
