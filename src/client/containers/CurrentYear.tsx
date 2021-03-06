import * as React from 'react';
import * as _ from 'lodash';
import { Layout, Tabs } from 'antd';

import { RouteChildrenProps } from 'react-router';
import util from '../utils';
import ChartPanel from '../components/ChartPanel';
import WholeTable from '../components/WholeTable';
import StatisticCard from '../components/StatisticCard';
import BasicColumnGraph from '../components/BasicColumnGraph';
import { AppContext } from '../context/appContext';
import * as constants from '../constants';
import request from '../utils/request';

const { useEffect, useContext } = React;
const { Content } = Layout;
const { TabPane } = Tabs;

function CurrentYear(props: RouteChildrenProps) {
  const appState = useContext(AppContext);
  const { allData } = appState;

  const changeTab = (activityKey: string): void => {
    appState.changeActivityKey(activityKey);
  };

  useEffect(() => {
    const year = constants.tabKeyRouterMap[props.location.pathname];
    request(year, (allHouses: cdFang.IhouseData[]) => {
      appState.changeData(allHouses);
    });
  }, []);

  const areasGroup = _.groupBy(allData, (item: cdFang.IhouseData) => item.area);
  const areasList = Object.keys(areasGroup);
  const tabpanels = util.sortArea(areasList).map((item: string) => (
    <TabPane tab={item} key={item}>
      <ChartPanel
        data={areasGroup[item]}
        panelKey={item}
        activityKey={appState.activityKey}
      />
    </TabPane>
  ));
  // 柱状图数据
  const { chartHouseData, chartBuilderData } = util.getBasicColumnGraphData(
    appState.allData
  );

  return (
    <Content className="content">
      <StatisticCard />
      <div className="content-graph-bar">
        <Tabs defaultActiveKey={appState.activityKey} onChange={changeTab}>
          {tabpanels}
        </Tabs>
      </div>
      <div className="content-basic-column">
        <div className="content-basic-column-title">整体统计</div>
        <BasicColumnGraph
          title="房源数排序图"
          data={chartHouseData}
          xAxis={constants.AREA}
          yAxis={constants.HOUSE_NUMBER}
          desc
        />
        <BasicColumnGraph
          title="楼盘数排序图"
          data={chartBuilderData}
          xAxis={constants.AREA}
          yAxis={constants.BUILDER_NUMBER}
          desc
        />
      </div>
      <div className="content-graph-table">
        <WholeTable />
      </div>
    </Content>
  );
}

export default CurrentYear;
