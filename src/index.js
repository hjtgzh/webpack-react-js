/*
 * @文件描述: 
 * @公司: cloudwise
 * @作者: janko
 * @Date: 2021-09-14 14:46:57
 * @LastEditors: janko
 * @LastEditTime: 2021-11-16 17:22:53
 */
import React, { useState } from "react";
import { render } from "react-dom";
import { ConfigProvider, DatePicker, message } from "antd";
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from "antd/lib/locale/zh_CN";
import "antd/dist/antd.less";
// import Router from './router.config';
import styles from "./index.less";
// import moment from 'moment';
// import 'moment/locale/zh-cn';

// moment.locale('zh-cn');

const App = () => {
  const [date, setDate] = useState(null);
  const handleChange = (value) => {
    message.info(
      `您选择的日期是: ${value ? value.format("YYYY年MM月DD日") : "未选择"}`
    );
    setDate(value);
  };
  function test() {
    new Promise((resolve, reject) => { console.log(1) })
  }
  test()
  return (
    <ConfigProvider locale={zhCN}>
      {/* <Router /> */}
      <div className={styles.home}>
        <DatePicker className={styles.picker} onChange={handleChange} />
        <div style={{ marginTop: 16 }}>
          当前日期：{date ? date.format("YYYY年MM月DD日") : "未选择"}
        </div>
      </div>
    </ConfigProvider>
  );
};

render(<App />, document.getElementById("root"));
