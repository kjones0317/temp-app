import React, { Component } from "react";
import ProgressBar from "react-toolbox/lib/progress_bar";
import { observer, inject } from "mobx-react";

import { Button } from "react-toolbox/lib/button";
import Navigation from "react-toolbox/lib/navigation";
import { Table, TableHead, TableRow, TableCell } from "react-toolbox/lib/table";

import Dialog from "react-toolbox/lib/dialog";
import preload from "../data.json";

const sortByCaloriesAsc = (a, b) => {
  if (a.title < b.title) return -1;
  if (a.title > b.title) return 1;
  return 0;
};

const sortByCaloriesDesc = (a, b) => {
  if (a.title > b.title) return -1;
  if (a.title < b.title) return 1;
  return 0;
};

@inject("common")
@observer
export default class Step2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      sorted: "asc",
      active: false,
      dialog: ""
    };
  }

  getSortedData = () => {
    const data = preload.etalon[this.props.common.temperature];
    const compare = this.state.sorted === "asc" ? sortByCaloriesAsc : sortByCaloriesDesc;
    return data.sort(compare);
  };

  handleRowSelect = selected => {
    const data = preload.etalon[this.props.common.temperature];
    const sortedData = this.getSortedData();
    this.setState({ selected: selected.map(item => sortedData[item].id) });
  };

  handleSortClick = () => {
    const { sorted } = this.state;
    const nextSorting = sorted === "asc" ? "desc" : "asc";
    this.setState({ sorted: nextSorting });
  };

  handleToggle = dialog => {
    console.log(dialog);
    this.setState({ active: !this.state.active });
    this.setState({ dialog: dialog });
  };

  actions = [{ label: "Закрыть", onClick: this.handleToggle }];

  render() {
    const { common } = this.props;
    const { sorted } = this.state;
    const data = preload.etalon[common.temperature];
    const sortedData = this.getSortedData();
    return (
      <div>
        <h1>Выбор эталонного термометра сопротивления </h1>
        <Table onRowSelect={this.handleRowSelect} selectable={true} style={{ marginTop: 10 }}>
          <TableHead displaySelect={false}>
            <TableCell onClick={this.handleSortClick} sorted={sorted}>Наименование</TableCell>
            <TableCell numeric>Производитель</TableCell>
            <TableCell numeric>Номинальное сопротивление, Ом</TableCell>
            <TableCell numeric>Чувствительность, Ом/°С</TableCell>
            <TableCell numeric>Погрешность, °С</TableCell>
            <TableCell>Info</TableCell>
          </TableHead>
          {sortedData.map((item, idx) => (
            <TableRow key={idx} selected={this.state.selected.indexOf(item.id) !== -1}>
              <TableCell>{item.title}</TableCell>
              <TableCell numeric>{item.manufacture}</TableCell>
              <TableCell numeric>{item.resistance}</TableCell>
              <TableCell numeric>{item.sence}</TableCell>
              <TableCell numeric>{item.error}</TableCell>
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
          title="Инфо"
        >
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
