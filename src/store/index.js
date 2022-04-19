import { createStore } from 'vuex';
export default createStore({
   state() {
      return {
         isPlayerLock: eval(localStorage.getItem('isPlayerLock')) || false,
         playHistory: [],
         fm_store_list: [],
         fm_lyric: {},
         fm_isPlay: false,
         fm_curTime: null,
         single: {
            name: '醒不来的梦',
            id: -1,
            pst: 0,
            t: 0,
            ar: [{ id: 12110146, name: '徐一', tns: [], alias: [] }],
            alia: [],
            pop: 100,
            st: 0,
            rt: null,
            fee: 0,
            v: 10,
            crbt: null,
            cf: '',
            al: {
               id: 36867069,
               name: '醒不来的梦',
               picUrl:
                  'https://p2.music.126.net/cfBQ46uJMbq8hTBZfz1BrA==/109951163071715323.jpg',
               tns: [],
               pic_str: '109951163071715323',
               pic: 109951163071715330,
            },
            dt: 287744,
            h: { br: 320000, fid: 0, size: 11512729, vd: -1300 },
            m: { br: 192000, fid: 0, size: 6907655, vd: 1100 },
            l: { br: 128000, fid: 0, size: 4605118, vd: -2 },
            a: null,
            cd: '01',
            no: 1,
            rtUrl: null,
            ftype: 0,
            rtUrls: [],
            djId: 0,
            copyright: 0,
            s_id: 0,
            mark: 0,
            originCoverType: 1,
            originSongSimpleData: null,
            tagPicList: null,
            resourceState: true,
            version: 10,
            songJumpInfo: null,
            entertainmentTags: null,
            single: 0,
            noCopyrightRcmd: null,
            rtype: 0,
            rurl: null,
            mst: 9,
            cp: 0,
            mv: 0,
            publishTime: 1511801828677,
         },
         songlist: [],
      };
   },
   mutations: {
      setPlayerLock(state) {
         let val = !eval(localStorage.getItem('isPlayerLock'));
         localStorage.setItem('isPlayerLock', val);
         state.isPlayerLock = val;
      },
      setFmStoreList(state, obj) {
         state.fm_store_list.push(...obj);
      },
      setFmLyric(state, obj) {
         state.fm_lyric = obj;
      },
      setFmIsPlay(state, val) {
         state.fm_isPlay = val;
      },
      changeFmIsPlay(state, val) {
         if (val == '') {
            state.fm_isPlay = !state.fm_isPlay;
         } else {
            state.fm_isPlay = val;
         }
      },
      changeCurTimeFm(state, time) {
         state.fm_curTime = time;
      },
      setSingle(state, obj) {
         state.single = obj;
      },
      setSongList(state, arr) {
         state.songlist = arr;
      },
      setPlayHistory(state, obj) {
         let index = state.playHistory.findIndex(
            element => element.id == obj.id
         );
         if (index != -1) {
            state.playHistory.splice(index, 1);
         }
         state.playHistory.splice(0, 0, obj);
      },
      movePlayHistory(state, id) {
         let index = state.playHistory.findIndex(element => element.id == id);
         console.log(index);
         state.playHistory.splice(index, 1);
      },
   },
   actions: {},
   modules: {},
});
