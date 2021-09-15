<!-- 路由组件订餐 -->
<template>
  <div class="goods">
    <!--左侧商品类别列表--菜单-->
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
          <li class="menu-item" v-for="(good,index) in goods" :key="index" @click="clickMenuItem(index)" :class="{current:index===currentIndex}">
          <span class="text bottom-border-1px">
            <img class="icon" :src="good.icon" v-if="good.icon" />
            {{ good.name }}
          </span>
        </li>
      </ul>
    </div>
    <!--右侧商品列表--菜单-->
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul ref="foodsUI">
        <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
          <h1 class="title">{{ good.name }}</h1>
          <ul>
            <li
              class="food-item bottom-border-1px"
              v-for="(food, index) in good.foods"
              :key="index"
            >
              <div class="icon">
                <img width="57" height="57" :src="food.icon" />
              </div>
              <div class="content">
                <h2 class="name">{{ food.name }}</h2>
                <p class="desc">{{ food.description }}</p>
                <div class="extra">
                  <span class="count">月售 {{ food.sellCount }} 份</span>
                  <span>好评率 {{ food.rating }}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{ food.price }}</span>
                </div>
                <div class="cartcontrol-wrapper">CartControl</div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
//读取商家商品信息
import { mapState } from 'vuex'
//引入滚动条
import BScroll from "better-scroll"
export default {
  computed: {
    ...mapState(['goods']),      //读取商家信息
    //添加计算属性;依据tops数组与scrollY值判断返回下标 0 1 2
    currentIndex(){
      //得到参与计算二哥数值 scrollY tops
      // const scrollY = this.scrollY;
      // const tops = this.tops;
       const {scrollY,tops} = this;
      //判断scrollY范围
       for(var i=0;i<tops.length;i++){
         if(scrollY > tops[i] && scrollY < tops[i+1]){
                   return i;
         }
       }
      //  const index = tops.findIndex((top,i)=>{
      //    return scrollY > top && scrollY < tops[i+1]
      //  });
      //满足条件返回下标
      //  return index;
    },
  },
  data() {
    return {
      tops:[],//右侧分类li元素高度数组
      scrollY:0,//右侧滑动顶部位置
    };
  },
  mounted() {
    //检查代码输出结果 ->ajax data dom  20ms
    this.$store.dispatch("getShopGoods").then(() => {
      this.$nextTick(() => {
        // console.log(this.$store)
        this._initScroll();    //0.1ms error 
        //解决方案:等待上面元素DOM更新结束
        this._initTops();
      })
    })
  },

  components: {
    // CartControl,
  },

  methods: {
    //点击左侧菜单右侧食物列表滑动
    clickMenuItem(index) {
      //一局左侧元素下标查找tops素组中对应元素y值
      const scrollY = this.tops[index];
      // 在data添加scrollY
      this.scrollY = scrollY;
      // 将当前y保存scrollY
      //右侧滑动块scrollTo跳转指定位置
      this.foodsScroll.scrollTo(0, -scrollY, 300)
    },
    //组件创建成功创建多个对象和方法..初始值单独写一个方法
    _initScroll() {
      // 创建better-scroll对象 绑定左侧菜单
      new BScroll(".menu-wrapper", {
        click: true          //左侧菜单支持点击事件右侧联动
      })
      // 创建better-scroll对象 绑定右侧菜单
      this.foodsScroll = new BScroll(".foods-wrapper", {
        probeType: 2,//滑动与滑动结束时触发
        click: true
      })
      // 为左侧better-scroll对象 绑定事件scroll
      this.foodsScroll.on("scroll", ({ x, y }) => {
        this.scrollY = Math.abs(y);
        console.log(this.scrollY)
      });
      // 为右侧better-scroll对象 绑定事件scrollEnd
      this.foodsScroll.on("scrollEnd", ({ x, y }) => {
        this.scrollY = Math.abs(y);
        console.log(this.scrollY)
      });
    },
    //计算所有商品类别元素高度
    _initTops() {
      //数组创建
      const tops = [];
      //变量创建top
      let top = 0;
      //jiangtop添加数组
      tops.push(top);
      //查找右侧所有的li元素
      const lis = this.$refs.foodsUI.getElementsByClassName("food-list-hook");
      // console.log(lis);  
      //创建循环遍历所有li获取高度累加保存
      //类数组转对象
      Array.prototype.slice.call(lis).forEach(li => {
        top += li.clientHeight;
        tops.push(top);
      })
      //将数组tops  保存data
      this.tops = tops;
    },
  }
}

</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
@import '../../../common/stylus/minxns.styl';

.goods {
  display: flex;
  position: absolute;
  top: 195px;
  bottom: 46px;
  width: 100%;
  background: #fff;
  overflow: hidden;

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;

    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      padding: 0 12px;
      line-height: 14px;

      &.current {
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #fff; // 高亮背景颜色白色...
        color: $green;
        font-weight: 700;

        .text {
          border-none();
        }
      }

      .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
      }

      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        bottom-border-1px(rgba(7, 17, 27, 0.1));
        font-size: 12px;
      }
    }
  }

  .foods-wrapper {
    flex: 1;

    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }

    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      bottom-border-1px(rgba(7, 17, 27, 0.1));

      &:last-child {
        border-none();
        margin-bottom: 0;
      }

      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }

      .content {
        flex: 1;

        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .desc, .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }

        .desc {
          line-height: 12px;
          margin-bottom: 8px;
        }

        .extra {
          .count {
            margin-right: 12px;
          }
        }

        .price {
          font-weight: 700;
          line-height: 24px;

          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }

          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
}
</style>