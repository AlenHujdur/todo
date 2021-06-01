import Component from '@glimmer/component';

// eslint-disable-next-line ember/new-module-imports
export default class ReportComponent extends Component{
  // eslint-disable-next-line ember/avoid-leaking-state-in-ember-objects
  get todos(){
  // return [
  //   { name: 'Mark Twain', status: "running" },
  //   { name: 'Virginia Woolf', status: "running" },
  //   { name: 'John Steinbeck', status: "stopped" },
  //   { name: 'Ralph Ellison', status: "paused" }
  // ]
    return 1+1;
  }
}
