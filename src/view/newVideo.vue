<template>
  <div class="center-page">
    <div v-html="remoteStream"
         :class="remoteStream?'distant-stream':''">
    </div>
    <div id='local_stream'
         class="local-stream">
    </div>
  </div>
</template>

<script>
  import TRTC from 'trtc-js-sdk';
  export default {
    data () {
      return {
        createForm: {
          mode: 'videoCall',
          sdkAppId: 1400353966,
          userId: null,
          userSig: null
        },
        client: '',//客户端服务
        remoteStream: '',//远方播放流
        localStream: '',//本地流
      }
    },
    mounted () {
      this.createForm.userId = this.getRandom(1, 100)
      this.getUserSig()
    },
    methods: {
      async getUserSig() {
        const userSig = {
          path: '/charge/api/vod/userSig',
          method: 'GET',
          server: 'trtc'
        }
        const pram = {
          appid: this.createForm.sdkAppId,
          userid: this.createForm.userId
        }
        const {data} = await this.$backend.request(userSig, pram)
        this.createForm.userSig = data
        this.createClient(2222)
      },
      //创建链接
      createClient (roomId) {
        this.client = TRTC.createClient(this.createForm);
        this.subscribeStream(this.client)
        this.joinRoom(this.client, roomId)
      },
      //订阅远端流--加入房间之前
      subscribeStream (client) {
        client.on('stream-added', event => {
          const remoteStream = event.stream;
          console.log('远端流增加: ' + remoteStream.getId());
          //订阅远端流
          client.subscribe(remoteStream);
        });
      },
      joinRoom (client, roomId) {
        this.client
          .join({ roomId })
          .catch(error => {
            console.error('进房失败 ' + error);
          })
          .then(() => {
            console.log('进房成功')
            // 创建本地流
            this.createStream(this.createForm.userId)
            // //播放远端流
            this.playStream(this.client)
          });
      },
      //创建本地音视频流
      createStream(userId) {
        const localStream = TRTC.createStream({ userId, audio: true, video: true });
        this.localStream =localStream
        localStream
          .initialize()
          .catch(error => {
            console.error('初始化本地流失败 ' + error);
          })
          .then(() => {
            console.log('初始化本地流成功');
            // 创建好后才能播放 本地流播放 local_stream 是div的id
            localStream.play('local_stream');
            //创建好后才能发布
            this.publishStream(localStream, this.client)
          });
      },
      //发布本地音视频流
      publishStream (localStream, client) {
        client
          .publish(localStream)
          .catch(error => {
            console.error('本地流发布失败 ' + error);
          })
          .then(() => {
            console.log('本地流发布成功');
          });
      },

      //播放远端流
      playStream (client) {
        client.on('stream-subscribed', event => {
          const remoteStream = event.stream;
          console.log('远端流订阅成功：' + remoteStream.getId());
          // 创建远端流标签，因为id是动态的，所以动态创建，用了v-html
          this.remoteStream = `<view id="${'remote_stream-' + remoteStream.getId()}"  ></view>`;
          //做了dom操作 需要使用$nextTick(),否则找不到创建的标签无法进行播放
          this.$nextTick(() => {
            //播放
            remoteStream.play('remote_stream-' + remoteStream.getId());
          })
        });
      },
      //退出音视频
      leaveRoom (client) {
        client
          .leave()
          .then(() => {
            console.log('退房成功')
            // 停止本地流，关闭本地流内部的音视频播放器
            this.localStream.stop();
            // 关闭本地流，释放摄像头和麦克风访问权限
            this.localStream.close();
            this.localStream = null;
            this.client = null
            // 退房成功，可再次调用client.join重新进房开启新的通话。
          })
          .catch(error => {
            console.error('退房失败 ' + error);
            // 错误不可恢复，需要刷新页面。
          });
      },
      getRandom(min, max) {
        const dec = max - min
        return Math.floor(Math.random() * dec + min)
      }
    }
  }
</script>


<style scoped>
  .local-stream {
    width: 500px;
    height: 500px;
  }
  .distant-stream {
    width: 200px;
    height: 200px;
  }
  video {

  }
</style>