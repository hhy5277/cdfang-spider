import * as React from 'react';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import * as DataSet from '@antv/data-set';
import * as constants from '../../constants';

interface IareaGraphData {
  month: string;
  [constants.HOUSE_NUMBER]?: number;
  [constants.BUILDER_NUMBER]?: number;
}

interface Iprops {
  title: string;
  data: IareaGraphData[];
}

function AreaGraph({ data, title }: Iprops) {
  const dv = new DataSet.View().source(data);
  dv.transform({
    type: 'fold',
    fields: [title],
    key: 'type',
    value: 'value'
  });
  const scale = {
    value: {
      alias: '数量'
    },
    month: {
      range: [0.01, 0.99],
      tickCount: 9
    }
  };
  return (
    <Chart height={400} data={dv} scale={scale} forceFit>
      <div className="chart-title">{`${title} / 月(统计图)`}</div>
      <Tooltip crosshairs />
      <Axis />
      <Legend />
      <Geom type="area" position="month*value" color="type" shape="smooth" />
      <Geom type="line" position="month*value" color="type" shape="smooth" />
    </Chart>
  );
}

export default AreaGraph;