/*
 * @文件类型:  swiper 左右滑动插件
 * @地址: https://www.swiper.com.cn/
 * @作者: 鹏家公子 
 * @日期: 2021-05-28 15:07:48 
 * @上次修改人:   鹏家公子 
 * @上次修改时间: 2021-05-28 15:07:48 
 * @注释:  https://github.com/surmon-china/vue-awesome-swiper
 *
 <swiper ref="mySwiper" :options="swiperOptions">
    <swiper-slide v-for="(tag, index) in selected">
                <span @contextmenu.prevent="dblclickGo($event)">
                    <el-tag 
                        :key="index"
                        
                        :effect="tag.active ? 'dark':'plain'"
                        size="medium"
                        closable
                        @close="tabClose(index)">
                            {{tag.name}} {{index}}
                    </el-tag>
                </span>

    </swiper-slide>

    <div class="swiper-pagination" slot="pagination"></div>
</swiper>
 * 
    data() {
        return {
            swiperOptions: {
                width:'150',
                pagination: {
                    el: '.swiper-pagination'
                }
            }
        };
    }
    computed:{
        swiper() {
            return this.$refs.mySwiper.$swiper
        }
    },
    mounted() {
      this.swiper.slideTo(3, 1000, false)
    }

    .swiper-slide{
        width: auto!important;
    }
 */

import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'

Vue.use(VueAwesomeSwiper)