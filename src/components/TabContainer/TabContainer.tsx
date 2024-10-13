import { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { tab, ToDo } from '../../types';
import { Item } from '../Item/Item';

type TabProps = {
  tabs: tab[];
  list: ToDo[];
  loading: boolean;
  setList: (list:ToDo[]) => void
}

export const TabContainer= ({tabs, list, loading, setList}:TabProps) => {

  const [key, setKey] = useState<any>(tabs[0]);

  const handleTabSelect = (k:string|null, e:React.SyntheticEvent<unknown>):void => {
    setKey(k);
  }
  const renderSwitch = (param:string, arr:ToDo[]) => {
    switch(param) {
      case 'Completed':
        return arr.filter(el => el.isCompleted === true);
      case 'Active':
        return arr.filter(el => el.isCompleted === false);
      default:
        return arr;
    }
  } 
  useEffect(()=> {
  },[loading])
  return (
    <Tabs
    key={'tabs'}
    defaultActiveKey={key}
    id="uncontrolled-tab-example"
    className="mb-3"
    onSelect={handleTabSelect}
  >


    
    {tabs.map((tab, idx) => (
      
      <Tab key={"tab-"+tab+idx} eventKey={tab} title={tab}>
        <ListGroup key={"listGroup-"+tab}>
          {renderSwitch(tab, list).map((item) => (
          <Item testId={"item-"+tab.toLowerCase()} key={'tab-'+tab+idx+'-item-'+item.id} item={item} setList={setList}></Item>
          ))} 
        </ListGroup>
        {loading && 
        <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>
        }
      </Tab>
    ))}


   
  </Tabs>
  )
}