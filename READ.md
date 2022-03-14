## 組件列表

1. 是否串接後台?

   - 是 : 載入 jquery 1.9 及 2 段後台 script
   - 否 : 載入 jquery 3.3，刪除 2 段後台 script

   ***

2. 基本組件

   - 右選單(手機版置頂)
   - 左選單桌機(串後台)
   - 手機底部選單(串後台)
   - 右邊 go top 按鈕
   - 底部輪播圖(手機版與 3 擇一)

   ***

3. 右選單 手機置頂 ( Right nav )

   - scss 需載入 sideNavUtils、rightNav
   - js init 需載入 sideNavEvent、rightNavSlider
   - js windowScroll 需載入 rightNavFixedTop
   - 桌機選單字數過多，手動調整 scss 裡的貼紙寬度
   - 桌機選單下方貼紙，會判斷為一張 or 多數來決定是否輪播

   ***

4. 左選單桌機-串後台 ( Left nav desktop )

   - scss 需載入 sideNavUtils、leftNav
   - js init 需載入 sideNavEvent

   ***

5. 手機底部選單-串後台 ( Footer board )

   - scss 需載入 footerBoard
   - js init 需載入 footerBoard
   - scss 有引用時，會自動將手機版 footer 及 right box 定位加高，並隱藏社群 icon 列表
   - 第四格社群面版若要改為一般連結，移除屬性 data-btn="board2"

   ***

6. 右邊 go top 按鈕 (Go top)

   - scss 需載入 rightBtn
   - js init 需載入 goTopEvt
   - js windowScroll 需載入 goTopShow

   ***

7. 桌手底部輪播 (Footer slider)

   - scss 需載入 footerSlider
   - js init 需載入 footerSlider
   - scss 有引用時，會自動將手機版 footer 及 right box 定位加高

   ***

8. 若 a 連結為錨點 hash，需替 a 連結添加 "hash" class name
