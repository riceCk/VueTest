<template>
  <section class="container">
    <v-refresh :on-refresh="onRefresh">
      <v-reload
          :on-infinite-load="onInfiniteLoad"
          :parent-pull-up-state="infiniteLoadData.pullUpState"
      >
        <div class="bank-box">
          <div class="bank-list" v-for="item in bankList" :key="item.id">
            <!--<div-->
                <!--class="bank-icon"-->
                <!--:style="{ 'background': 'url(' + require('../../assets/images/bankIcon/'+item.iconName) + ') no-repeat', 'background-size': '100%' }"-->
            <!--&gt;</div>-->
            <span class="bank-name">{{item.bankName}}</span>
          </div>
        </div>
        <div class="hot-box">
          <div class="hot-header">
            <span class="hot-name">热门推荐</span>
            <div class="more-box">
              <span class="more-text">查看更多</span>
              <span class="more-icon"></span>
            </div>
          </div>
          <div class="hot-centenrt">
            <div class="hot-left">
              <span class="left-name">{{hotLeft.name}}</span>
              <span class="left-desc">{{hotLeft.desc}}</span>
              <!--<div-->
                  <!--class="left-img"-->
                  <!--:style="{ 'background': 'url(' + require('../../assets/images/bank/'+hotLeft.imgName) + ') no-repeat', 'background-size': '100%' }"-->
              <!--&gt;</div>-->
            </div>
            <div class="hot-right">
              <div class="right-top">
                <div class="text-box">
                  <span class="right-name">{{centenrtOne.name}}</span>
                  <span class="right-desc">{{centenrtOne.desc}}</span>
                </div>
                <!--<div-->
                    <!--class="right-img"-->
                    <!--:style="{ 'background': 'url(' + require('../../assets/images/bank/'+centenrtOne.imgName) + ') no-repeat', 'background-size': '100%' }"-->
                <!--&gt;</div>-->
              </div>
              <div class="hot-right-bottom">
                <div class="text-box2">
                  <span class="right-name2">{{centenrtTwo.name}}</span>
                  <span class="right-desc2">{{centenrtTwo.desc}}</span>
                </div>
                <!--<div-->
                    <!--class="right-img"-->
                    <!--:style="{ 'background': 'url(' + require('../../assets/images/bank/'+centenrtTwo.imgName) + ') no-repeat', 'background-size': '100%' }"-->
                <!--&gt;</div>-->
              </div>
            </div>
          </div>
        </div>
        <div class="card-state">
          <div class="card-progress border-right">
            <div class="progress-icon"></div>
            <div class="card-text">
              <span class="card-name">办卡进度</span>
              <span class="card-desc">让等待随处可见</span>
            </div>
          </div>
          <div class="card-activation">
            <div class="activation-icon"></div>
            <div class="card-text">
              <span class="card-name">办卡激活</span>
              <span class="card-desc">让等待随处可见</span>
            </div>
          </div>
        </div>
        <div class="card-order">
          <div class="border-bottom card-bottom">
            <div class="hot-header">
              <span class="hot-name">热卡排行</span>
            </div>
          </div>
          <div slot="load-more">
            <li
                class="card-list"
                v-for="(item,index) in infiniteLoadData.pullUpList"
                :key="item.id"
            >
              <div
                  class="card-content"
                  :class="infiniteLoadData.pullUpList.length - 1 != index? 'card-bottom':''"
              >
                <!--<div-->
                    <!--class="card-img"-->
                    <!--:style="{ 'background': 'url(' + require('../../assets/images/bank/'+item.imgName) + ') no-repeat', 'background-size': '100%' }"-->
                <!--&gt;</div>-->
                <div class="card-list-text">
                  <p class="card-name">{{item.cardName}}</p>
                  <p class="card-title">{{item.cardTitle}}</p>
                  <div class="words-lists">
                    <div class="card-words">
                      <p class="card-word">{{item.cardWordOne}}</p>
                    </div>
                    <div v-if="item.cardWordTwo" class="card-words words-two">
                      <p class="card-word">{{item.cardWordTwo}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </div>
        </div>
      </v-reload>
    </v-refresh>
  </section>
</template>

<script>
  import DropDownRefresh from '../common/DropDownRefresh'
  import PullUpReload from '../common/PullUpReload'

  export default {
    name: '',
    components: {
      'v-refresh': DropDownRefresh,
      'v-reload': PullUpReload
    },
    data () {
      return {
        bankList: [
          {
            iconName: 'zhaoshang.png',
            bankName: '招商银行'
          },
          {
            iconName: 'minsheng.png',
            bankName: '民生银行'
          },
          {
            iconName: 'pingancar.png',
            bankName: '平安联名'
          },
          {
            iconName: 'xingye.png',
            bankName: '兴业银行'
          },
          {
            iconName: 'shanghai.png',
            bankName: '上海银行'
          },
          {
            iconName: 'jiaotong.png',
            bankName: '交通银行'
          },
          {
            iconName: 'guangda.png',
            bankName: '光大银行'
          },
          {
            iconName: 'more.png',
            bankName: '全部银行'
          }
        ],
        hotLeft: {
          bankName: '交通银行',
          name: '交行Y-POWER黑卡',
          desc: '额度100%取现',
          imgName: 'jiaohangY-POWER.png'
        },
        centenrtOne: {
          bankName: '招商银行',
          name: '招行YOUNG卡',
          desc: '生日月双倍积分',
          imgName: 'zhaohangYOUNG.png'
        },
        centenrtTwo: {
          bankName: '光大银行',
          name: '光大淘票票公仔联名卡',
          desc: '电影达人必备',
          imgName: 'guangdalianming.png'
        },
        cardList: [
          {
            bankName: '平安联名',
            imgName: 'pinganqiche.png',
            cardName: '平安银行信用卡',
            cardTitle: '平安银行汽车之家联名单币卡',
            cardWordOne: '首年免年费',
            cardWordTwo: '加油88折'
          },
          {
            bankName: '上海银行',
            imgName: 'shanghaitaobao.png',
            cardName: '上海银行信用卡',
            cardTitle: '淘宝金卡',
            cardWordOne: '积分抵现',
            cardWordTwo: '首刷有礼'
          },
          {
            bankName: '华夏银行',
            imgName: 'huaxiaiqiyi.png',
            cardName: '华夏银行信用卡',
            cardTitle: '华夏爱奇艺悦看卡',
            cardWordOne: '送爱奇艺会员',
            cardWordTwo: '商城8折'
          },
          {
            bankName: '浦发银行',
            imgName: 'pufajianyue.png',
            cardName: '浦发银行信用卡',
            cardTitle: '浦发银行简约白金卡',
            cardWordOne: '团购立减',
            cardWordTwo: '酒店优惠 免年费'
          },
          {
            bankName: '中信银行',
            imgName: 'zhongxinbaijin.png',
            cardName: '中信银行信用卡',
            cardTitle: '中信银行i白金信用卡',
            cardWordOne: '首刷有礼',
            cardWordTwo: '双倍积分'
          }
        ],
        // 上拉加载的设置
        infiniteLoadData: {
          initialShowNum: 3, // 初始显示多少条
          everyLoadingNum: 3, // 每次加载的个数
          pullUpState: 2, // 子组件的pullUpState状态
          pullUpList: [], // 上拉加载更多数据的数组
          showPullUpListLength: this.initialShowNum // 上拉加载后所展示的个数
        }
      }
    },
    mounted () {
      this.getStartPullUpState()
      this.getPullUpDefData()
    },
    methods: {
      /**
       * 获取上拉加载的初始数据
       */
      getPullUpDefData () {
        this.infiniteLoadData.pullUpList = []
        if (this.cardList.length < this.infiniteLoadData.initialShowNum) {
          for (let i = 0; i < this.cardList.length; i++) {
            this.infiniteLoadData.pullUpList.push(this.cardList[i])
          }
        } else {
          for (let i = 0; i < this.infiniteLoadData.initialShowNum; i++) {
            this.infiniteLoadData.pullUpList.push(this.cardList[i])
          }
        }
        this.getStartPullUpState()
      },

      /**
       * 获取上拉加载的pullUpState状态
       */
      getStartPullUpState () {
        if (this.infiniteLoadData.pullUpList.length) {
          if (this.cardList.length <= this.infiniteLoadData.initialShowNum) {
            // 修改子组件的pullUpState状态
            this.infiniteLoadData.pullUpState = 3
          } else {
            this.infiniteLoadData.pullUpState = 1
          }
        } else {
          this.infiniteLoadData.pullUpState = 0
        }
      },

      /**
       * 上拉一次加载更多的数据
       */
      getPullUpMoreData () {
        this.showPullUpListLength = this.infiniteLoadData.pullUpList.length
        if (this.infiniteLoadData.pullUpList.length + this.infiniteLoadData.everyLoadingNum > this.cardList.length) {
          for (let i = 0; i < this.cardList.length - this.showPullUpListLength; i++) {
            this.infiniteLoadData.pullUpList.push(this.cardList[i + this.showPullUpListLength])
          }
        } else {
          for (let i = 0; i < this.infiniteLoadData.everyLoadingNum; i++) {
            this.infiniteLoadData.pullUpList.push(this.cardList[i + this.showPullUpListLength])
          }
        }
        if (this.cardList.length === this.infiniteLoadData.pullUpList.length) {
          this.infiniteLoadData.pullUpState = 3
        } else {
          this.infiniteLoadData.pullUpState = 1
        }
      },

      /**
       * 下拉刷新
       */
      onRefresh (done) {
        // 如果下拉刷新和上拉加载同时使用，下拉时初始化上拉的数据
        this.getStartPullUpState()
        this.getPullUpDefData()
        done() // call done
      },

      /**
       * 上拉加载
       */
      onInfiniteLoad (done) {
        if (this.infiniteLoadData.pullUpState === 1) {
          this.getPullUpMoreData()
        }
        done()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*@import "../../assets/css/not2rem.css";*/

  .container {
    display: flex;
    flex-direction: column;
    width: 750px;
    height: 1334px;
    background-color: #f7f7f7;
  }

  .bank-box {
    display: flex;
    flex-wrap: wrap;
    padding: 2px 7px 42px 7px;
    background-color: #fff;
  }

  .bank-list {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100px;
    height: 98px;
    margin: 40px 42px 0 42px;
  }

  .bank-icon {
    width: 56px;
    height: 56px;
    margin: 0 22px 18px;
  }

  .bank-name {
    display: flex;
    align-items: center;
    width: 110px;
    height: 24px;
    line-height: 24px;
    font-size: 24px;
    color: #333;
  }

  .hot-box {
    width: 100%;
    height: 420px;
    margin-top: 10px;
    background: #fff;
  }

  .hot-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 674px;
    height: 80px;
    margin: 0 30px 0 46px;
  }

  .hot-name {
    display: flex;
    align-items: center;
    height: 28px;
    font-size: 28px;
    color: #333;
  }

  .more-text {
    display: flex;
    align-items: center;
    font-size: 24px;
    color: #999;
  }

  .more-box {
    display: flex;
    align-items: center;
  }

  .more-icon {
    margin-left: 20px;
    width: 11px;
    height: 20px;
    background: yellow;
    background-size: 100%;
  }

  .hot-centenrt {
    display: flex;
    align-items: center;
    width: 710px;
    height: 320px;
    margin: 0 20px 20px 20px;
  }

  .hot-left {
    display: flex;
    flex-direction: column;
    width: 350px;
    height: 320px;
    background: #f7f7f7;
  }

  .left-name {
    display: flex;
    align-items: center;
    width: 282px;
    height: 24px;
    margin: 50px 34px 0 34px;
    font-size: 24px;
    line-height: 24px;
    color: #333;
  }

  .left-desc {
    display: flex;
    align-items: center;
    width: 282px;
    height: 20px;
    margin: 12px 34px 0 34px;
    font-size: 20px;
    line-height: 20px;
    color: #999;
  }

  .left-img {
    width: 220px;
    height: 142px;
    margin-left: 34px;
    margin-top: 34px;
  }

  .hot-right {
    display: flex;
    flex-direction: column;
    width: 350px;
    height: 320px;
    margin-left: 10px;
  }

  .right-top {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 156px;
    background: #f7f7f7;
  }

  .text-box {
    display: flex;
    flex-direction: column;
    width: 180px;
    height: 58px;
    margin: 49px 20px 0 20px;
  }

  .right-name {
    display: flex;
    align-items: center;
    width: 100%;
    height: 24px;
    line-height: 24px;
    font-size: 24px;
    color: #333;
  }

  .right-desc {
    display: flex;
    align-items: center;
    margin-top: 10px;
    width: 100%;
    height: 24px;
    line-height: 24px;
    font-size: 24px;
    color: #999;
  }

  .right-img {
    width: 110px;
    height: 70px;
    margin-top: 43px;
  }

  .hot-right-bottom {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 156px;
    margin-top: 8px;
    background: #f7f7f7;
  }

  .text-box2 {
    display: flex;
    flex-direction: column;
    width: 180px;
    margin: 31px 20px 0 20px;
  }

  .right-name2 {
    display: flex;
    align-items: center;
    width: 100%;
    height: 58px;
    line-height: 30px;
    font-size: 24px;
    color: #333;
  }

  .right-desc2 {
    display: flex;
    align-items: center;
    margin-top: 12px;
    width: 100%;
    height: 24px;
    line-height: 24px;
    font-size: 24px;
    color: #999;
  }

  .card-state {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 128px;
    margin-top: 10px;
    background-color: #fff;
  }

  .card-progress {
    display: flex;
    align-items: center;
    width: 327px;
    height: 88px;
    margin: 20px 0 20px 48px;
  }

  .progress-icon {
    width: 48px;
    height: 48px;
    margin: 20px 0;
    background: red;
    background-size: 100%;
  }

  .activation-icon {
    width: 48px;
    height: 48px;
    margin: 20px 0;
    background: blue;
    background-size: 100%;
  }

  .card-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 228px;
    height: 66px;
    margin: 11px 20px 11px 30px;
  }

  .card-name {
    display: flex;
    align-items: center;
    width: 100%;
    height: 28px;
    line-height: 28px;
    font-size: 28px;
    color: #333;
  }

  .card-desc {
    display: flex;
    align-items: center;
    width: 100%;
    height: 22px;
    line-height: 22px;
    font-size: 22px;
    margin-top: 16px;
    color: #999;
  }

  .card-activation {
    display: flex;
    align-items: center;
    width: 326px;
    height: 88px;
    margin: 20px 0 20px 48px;
  }

  .card-order {
    width: 100%;
    height: auto;
    margin-top: 10px;
    background-color: #fff;
  }

  .border-bottom {
    width: 100%;
    height: 80px;
  }

  .card-list {
    width: 100%;
    height: 228px;
    list-style-type: none;
  }

  .card-content {
    display: flex;
    flex-direction: row;
    width: 700px;
    height: 228px;
    margin-left: 50px;
  }

  .card-img {
    width: 186px;
    height: 120px;
    margin: 54px 0 54px 20px;
  }

  .card-list-text {
    display: flex;
    flex-direction: column;
    width: 386px;
    height: 124px;
    margin: 52px 34px 52px 74px;
  }
  .card-name {
    width: 100%;
    height: 28px;
    line-height: 28px;
    font-size: 28px;
    color: #333;
  }
  .card-title {
    width: 100%;
    height: 24px;
    margin-top: 20px;
    line-height: 24px;
    font-size: 24px;
    color: #666;
  }
  .words-lists {
    display: flex;
    flex-direction: row;
  }
  .card-words {
    height: 36px;
    margin-top: 16px;
    border-radius: 20px;
    background-color: #e8ca88;
  }
  .card-word {
    height: 20px;
    padding: 8px 18px;
    line-height: 20px;
    font-size: 20px;
    color: #4b4b4b;
  }
  .words-two {
    margin-left: 20px;
  }
</style>