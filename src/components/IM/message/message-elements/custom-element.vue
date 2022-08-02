<!--
 * @Name: 聊天框显示主体
 * @Author: bpwen.cn
 * @Date: 2021-07-13 18:37:49
 * @LastEditors: VSCode
 * @LastEditTime: 2021-07-30 10:47:07
-->
<template>
    <message-bubble :isMine="isMine" :message="message">
        <div class="custom-element-wrapper">
            <div class="survey" v-if="this.payload.data === 'survey'">
                <div class="title">对IM DEMO的评分和建议</div>
                <el-rate
                    v-model="rate"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}"
                >
                </el-rate>
                <div class="suggestion">{{ this.payload.extension }}</div>
            </div>
            <span class="text customized" v-else>
                <template v-if="text.isFromGroupLive && text.isFromGroupLive === 1">
                    <message-group-live-status :liveInfo='text' />
                </template>
                <template v-else>
                    <template v-if="text !=  '自定义消息'">{{text}}</template>
                    <template v-else-if="item.retailPrice">
                        <a :href="item.url" target="_blank" title="跳转到商品详情">
                            <el-image
                                :src="item.picUrl"
                                fit="fill"
                                :lazy="true"
                                class="image"
                            ></el-image>
                            <div>名称：{{ item.goodsName }}</div>
                            <div>
                                价格：<span class="ui-color-hong">{{
                                    item.retailPrice
                                }}</span>
                            </div>  
                        </a>
                    </template>
                    <template v-else>
                        <a :href="item.link" target="_blank">{{item.text}}</a>
                    </template>
                </template>
            </span>
        </div>
    </message-bubble>
</template>

<script>
import { mapState } from "vuex";
import MessageBubble from "../message-bubble";
import { Rate } from "element-ui";
import MessageGroupLiveStatus from "../message-group-live-status";

export default {
    name: "CustomElement",
    props: {
        payload: {
            type: Object,
            required: true,
        },
        message: {
            type: Object,
            required: true,
        },
        isMine: {
            type: Boolean,
        },
        definition: {},
    },
    components: {
        MessageBubble,
        ElRate: Rate,
        MessageGroupLiveStatus,
    },
    data() {
        return {
            item: {},
        };
    },
    watch: {
        payload: {
            deep: true,
            immediate: true,
            handler: function (v) {
                if(v.data){
                    this.item = JSON.parse(v.data);
                }
            }
        },
    },
    computed: {
        ...mapState({
            currentUserProfile: (state) => state.userim.currentUserProfile,
        }),
        text() {
            return this.translateCustomMessage(this.payload);
        },
        rate() {
            return parseInt(this.payload.description);
        },
    },
    methods: {
        translateCustomMessage(payload) {
            let videoPayload = {};
            try {
                videoPayload = JSON.parse(payload.data);
            } catch (e) {
                videoPayload = {};
            }
            if (payload.data === "group_create") {
                return `${payload.extension}`;
            }
            if (videoPayload.roomId) {
                videoPayload.roomId = videoPayload.roomId.toString();
                videoPayload.isFromGroupLive = 1;
                return videoPayload;
            }
            if (payload.text) {
                return payload.text;
            } else {
                return "自定义消息";
            }
        },
    },
};
</script>

<style lang="stylus" scoped>
.text {
    font-weight: bold;
}

.title {
    font-size: 16px;
    font-weight: 600;
    padding-bottom: 10px;
}

.survey {
    background-color: white;
    color: black;
    padding: 20px;
    display: flex;
    flex-direction: column;
}

.suggestion {
    padding-top: 10px;
    font-size: 14px;
}
</style>

<style lang="less" scoped>
.customized {
    a {
        color: #000;
        text-decoration: none;
        line-height: 30px;
        .image {
            max-width: 200px;
        }
    }
}
</style>