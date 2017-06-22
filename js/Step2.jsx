import React, { Component } from 'react';
import ProgressBar from 'react-toolbox/lib/progress_bar';
import { observer, inject } from 'mobx-react';

import { Button } from 'react-toolbox/lib/button';
import Navigation from 'react-toolbox/lib/navigation';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import Tooltip from 'react-toolbox/lib/tooltip';
import FontIcon from 'react-toolbox/lib/font_icon';

import Dialog from 'react-toolbox/lib/dialog';

const TooltipCell = Tooltip(TableCell);

const data = [
  { id: 1, name: 'Авапы', calories: 305, fat: 3.7, sodium: 413, calcium: '3%', iron: '8%', dialog: 'Test' },
  { id: 2, name: 'ыапрыапр', calories: 452, fat: 25.0, sodium: 326, calcium: '2%', iron: '22%', dialog: 'Test' },
  { id: 3, name: 'йукейуке', calories: 262, fat: 16.0, sodium: 337, calcium: '6%', iron: '7%', dialog: 'Test' },
  { id: 4, name: 'фвапфвап', calories: 159, fat: 6.0, sodium: 87, calcium: '14%', iron: '1%', dialog: 'Test' },
  { id: 5, name: 'плдполд', calories: 356, fat: 16.0, sodium: 327, calcium: '7%', iron: '16%', dialog: 'Test' },
  { id: 6, name: 'уенге уенгуег', calories: 237, fat: 9.0, sodium: 129, calcium: '8%', iron: '1%', dialog: 'Test' },
  { id: 7, name: 'ароларол', calories: 375, fat: 0.0, sodium: 50, calcium: '0%', iron: '0%', dialog: 'Test' },
  { id: 8, name: 'чмитчмтичми', calories: 518, fat: 26.0, sodium: 54, calcium: '12%', iron: '6%', dialog: 'Test' }
];

const sortByCaloriesAsc = (a, b) => {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
};

const sortByCaloriesDesc = (a, b) => {
  if (a.name > b.name) return -1;
  if (a.name < b.name) return 1;
  return 0;
};

@inject('common')
@observer
export default class Step2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      sorted: 'asc',
      active: false,
      dialog: ''
    };
  }

  getSortedData = () => {
    const compare = this.state.sorted === 'asc' ? sortByCaloriesAsc : sortByCaloriesDesc;
    return data.sort(compare);
  };

  handleRowSelect = selected => {
    const sortedData = this.getSortedData();
    this.setState({ selected: selected.map(item => sortedData[item].id) });
  };

  handleSortClick = () => {
    const { sorted } = this.state;
    const nextSorting = sorted === 'asc' ? 'desc' : 'asc';
    this.setState({ sorted: nextSorting });
  };

  handleToggle = dialog => {
    console.log(dialog);
    this.setState({ active: !this.state.active });
    this.setState({ dialog: dialog });
  };

  actions = [{ label: 'Закрыть', onClick: this.handleToggle }];

  render() {
    const { common } = this.props;
    const { sorted } = this.state;
    const sortedData = this.getSortedData();
    return (
      <div>
        <Table onRowSelect={this.handleRowSelect} selectable={true} style={{ marginTop: 10 }}>
          <TableHead displaySelect={false}>
            <TableCell onClick={this.handleSortClick} sorted={sorted}>Dessert (100g serving)</TableCell>
            <TableCell numeric>Calories</TableCell>
            <TableCell numeric>Fat (g)</TableCell>
            <TableCell numeric>Sodium (mg)</TableCell>
            <TableCell numeric>Calcium (%)</TableCell>
            <TableCell numeric>Iron (%)</TableCell>
            <TableCell>Test</TableCell>
          </TableHead>
          {sortedData.map((item, idx) => (
            <TableRow key={idx} selected={this.state.selected.indexOf(item.id) !== -1}>
              <TableCell>{item.name}</TableCell>
              <TableCell numeric>{item.calories}</TableCell>
              <TableCell numeric>{item.fat}</TableCell>
              <TableCell numeric>{item.sodium}</TableCell>
              <TableCell numeric>{item.calcium}</TableCell>
              <TableCell numeric>{item.iron}</TableCell>
              <TableCell>
                <Button label="Подробнее" onClick={() => this.handleToggle(item.dialog + item.id)} />
              </TableCell>
            </TableRow>
          ))}
        </Table>

        <Dialog
          actions={this.actions}
          active={this.state.active}
          onEscKeyDown={this.handleToggle}
          onOverlayClick={this.handleToggle}
          title="My awesome dialog">
          <p>{this.state.dialog}</p>
        </Dialog>
        <br />
        <Navigation>
          <Button label="Назад" raised accent onClick={() => this.props.tabChange(0)} />
          <Button
            label="Далее"
            raised
            primary
            onClick={() => this.props.tabChange(2)}
            disabled={this.state.selected.length === 0}
          />
        </Navigation>
      </div>
    );
  }
}
