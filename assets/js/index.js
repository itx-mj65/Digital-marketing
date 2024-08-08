Vue.component('cardss', {
    template: `
<div class="cardss-wrap"
@mousemove="handleMouseMove"
@mouseenter="handleMouseEnter"
@mouseleave="handleMouseLeave"
ref="cardss">
<div class="cardss"
:style="cardssStyle">
<div class="cardss-bg" :style="[cardssBgTransform, cardssBgImage]"></div>
<div class="cardss-info">
  <slot name="header"></slot>
  <slot name="content"></slot>
</div>
</div>
</div>`,
    mounted() {
        this.width = this.$refs.cardss.offsetWidth;
        this.height = this.$refs.cardss.offsetHeight;
    },
    props: ['dataImage'],
    data() {
        return {
            width: 0,
            height: 0,
            mouseX: 0,
            mouseY: 0,
            mouseLeaveDelay: null
        }
    },
    computed: {
        mousePX() {
            return this.mouseX / this.width;
        },
        mousePY() {
            return this.mouseY / this.height;
        },
        cardssStyle() {
            const rX = this.mousePX * 30;
            const rY = this.mousePY * -30;
            return {
                transform: `rotateY(${rX}deg) rotateX(${rY}deg)`
            };
        },
        cardssBgTransform() {
            const tX = this.mousePX * -40;
            const tY = this.mousePY * -40;
            return {
                transform: `translateX(${tX}px) translateY(${tY}px)`
            }
        },
        cardssBgImage() {
            return {
                backgroundImage: `url(${this.dataImage})`
            }
        }
    },
    methods: {
        handleMouseMove(e) {
            this.mouseX = e.pageX - this.$refs.cardss.offsetLeft - this.width / 2;
            this.mouseY = e.pageY - this.$refs.cardss.offsetTop - this.height / 2;
        },
        handleMouseEnter() {
            clearTimeout(this.mouseLeaveDelay);
        },
        handleMouseLeave() {
            this.mouseLeaveDelay = setTimeout(() => {
                this.mouseX = 0;
                this.mouseY = 0;
            }, 1000);
        }
    }
});

new Vue({
    el: '#app'
});

