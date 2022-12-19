import { createRoot } from 'react-dom/client';
import {
  BreadcrumbComponent,
  BreadcrumbItemDirective,
  BreadcrumbItemsDirective,
} from '@syncfusion/ej2-react-navigations';
import './index.css';
import { getComponent } from '@syncfusion/ej2-base';
import dataColumn from './data2';
import {
  ButtonComponent,
  SwitchComponent,
} from '@syncfusion/ej2-react-buttons';
import * as React from 'react';

import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Group,
  Sort,
  ColumnMenu,
  ColumnChooser,
  Toolbar,
  Filter,
  Page,
  Inject,
  Edit,
  Reorder,
} from '@syncfusion/ej2-react-grids';
import { orderDetails } from './data';
import { updateSampleSection } from './sample-base';

function ColumnMenuSample() {
  let gridObj = '';
  let breadObj = '';
  const CLASS_HIDEN = 'classHiden';
  const CLASS_SHOW = 'classShow';
  /*React.useEffect(() => {
    updateSampleSection();
  }, []);*/

  const [showFolder, setShowFolder] = React.useState(true);
  const [dataGrid, setDataGrid] = React.useState(dataColumn);
  const [routes, setRoutes] = React.useState([{ text: 'Home', id: null }]);
  const [histParent, setHistParent] = React.useState([]);
  const [isSelectDrag, setIsSelectDrag] = React.useState(CLASS_HIDEN);
  const [isSelectEdit, setIsSelectEdit] = React.useState(CLASS_HIDEN);
  const [isSelectHist, setIsSelectHist] = React.useState(CLASS_HIDEN);
  const [columnsGrid, setColumnsGrid] = React.useState([]);
  const [enableAutoFill, setEnableAutoFill] = React.useState(false);
  const [groupOptions, setGroupOptions] = React.useState({
    showGroupedColumn: false,
    allowReordering: true,
    showDropArea: false,
  });
  const [editSettings, setEditSettings] = React.useState({
    mode: 'Dialog',
    allowAdding: true,
    allowDeleting: true,
    allowEditing: true,
  });
  const [sortingOptions, setSortingOptions] = React.useState({
    columns: [],
  });
  const [filterOptions, setFilterOption] = React.useState({
    columns: [],
    type: 'Excel',
  });
  const [selectionSettings, setSelectionSettings] = React.useState({
    cellSelectionMode: 'Flow',
    type: 'Multiple',
    mode: 'Both',
  });

  React.useEffect(() => {
    const idParent = routes[routes.length - 1].id;
    if (showFolder) {
      setDataGrid(dataColumn.filter((e) => e.ParentFolderId === idParent));
    } else {
      setDataGrid(
        dataColumn.filter((e) => e.ParentFolderId === idParent && !e.IsFolder)
      );
    }
  }, [routes, showFolder]);

  const ICON_DRAG = 'e-drop-down'; //'e-sub-total'
  const ICON_EDIT = 'e-conditional-formatting';
  const ICON_HIST = 'e-highlight';

  const TOOLBAR_SETTINGS = [
    'Add',
    'Edit',
    'Delete',
    'Update',
    'Cancel',
    'Search',
    'ColumnChooser',
    {
      prefixIcon: ICON_DRAG,
      id: 'Drag',
      cssClass: isSelectDrag,
      text: 'Drag column',
    },
    {
      prefixIcon: ICON_EDIT,
      id: 'Edit',
      cssClass: isSelectEdit,
      text: 'Edit inline',
    },
    { prefixIcon: ICON_HIST, id: 'Hist', text: 'Historial' },
  ];
  //const groupOptions = { showGroupedColumn: true };
  const filterSettings = { type: 'CheckBox' };
  const editOptions = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
  };

  const clickHandler = (args) => {
    if (args.item.id === 'Drag') {
      const componentGrid = JSON.parse(
        getComponent('GridView', 'grid').getPersistData()
      );
      isSelectDrag === CLASS_HIDEN
        ? setIsSelectDrag(CLASS_SHOW)
        : setIsSelectDrag(CLASS_HIDEN);
      setGroupOptions({
        ...groupOptions,
        columns: componentGrid.groupSettings.columns,
        showDropArea: !groupOptions.showDropArea,
      });
    }

    if (args.item.id === 'Edit') {
      if (isSelectEdit === CLASS_HIDEN) {
        setEnableAutoFill(true);
        setEditSettings({
          mode: 'Batch',
          allowAdding: false,
          allowDeleting: false,
          allowEditing: true,
        });
        setSelectionSettings({
          cellSelectionMode: 'Box',
          type: 'Multiple',
          mode: 'Cell',
        });
        setIsSelectEdit(CLASS_SHOW);
      } else {
        setEnableAutoFill(false);
        setEditSettings({
          mode: 'Dialog',
          allowAdding: true,
          allowDeleting: true,
          allowEditing: true,
        });
        setSelectionSettings({
          cellSelectionMode: 'Flow',
          type: 'Multiple',
          mode: 'Both',
        });
        setIsSelectEdit(CLASS_HIDEN);
      }
    }

    if (args.item.id === 'Hist') {
      isSelectHist === CLASS_HIDEN
        ? setIsSelectHist(CLASS_SHOW)
        : setIsSelectHist(CLASS_HIDEN);
    }
  };

  const templateFolder = (args) => {
    return args.IsFolder ? (
      <span className="e-icons e-folder-open"></span>
    ) : (
      <></>
    );
  };

  const rowClick = (args) => {
    if (args.rowData.IsFolder) {
      const item = { text: args.rowData.Nombre, id: args.rowData.Id };
      const rout = [...routes, item];
      console.log('rout', rout);
      //setRoutes(rout);
      const component = getComponent('bread', 'breadcrumb');
      component.items = rout;
      console.log('component', component);
    }
  };

  const breadcrumbClick = (args) => {
    const rouIndex = routes.findIndex((e) => e.id == args.item.id);
    const rouAux = routes.filter((e, i) => i <= rouIndex);
    console.log('routes2', rouAux);
    //setRoutes(rouAux);
    const component = getComponent('bread', 'breadcrumb');
    component.items = rouAux;
  };

  const changeSwitchFolder = (args) => {
    setShowFolder(args.checked);
    /*if (args.checked) {
      setDataGrid(dataColumn.filter((e) => e.ParentFolderId === parent));
    } else {
      setDataGrid(
        dataColumn.filter((e) => e.ParentFolderId === parent && !e.IsFolder)
      );
    }*/
  };

  return (
    <div className="control-pane">
      <div className="control-section">
        <div>
          <label htmlFor="switch1"> Folder </label>
          <SwitchComponent
            id="switch1"
            name="Tethering"
            value="Folder"
            checked={showFolder}
            change={changeSwitchFolder}
          />
        </div>
        <BreadcrumbComponent
          id="bread"
          maxItems={2}
          enableNavigation={false}
          //separatorTemplate={breadcrumbTemplate}
          overflowMode="Collapsed"
          items={routes}
          itemClick={breadcrumbClick}
          enableActiveItemNavigation={false}
          activeItem={routes[routes.length - 1].text}
        ></BreadcrumbComponent>
        <GridComponent
          id="GridView"
          dataSource={dataGrid}
          allowFiltering={true}
          allowGrouping={true}
          allowPaging={true}
          allowReordering={true}
          allowResizing={true}
          allowSorting={true}
          editSettings={editSettings}
          enableAutoFill={enableAutoFill}
          filterSettings={filterOptions}
          groupSettings={groupOptions}
          pageSettings={{ pageSizes: true }}
          selectionSettings={selectionSettings}
          showColumnChooser={true}
          sortSettings={sortingOptions}
          toolbar={TOOLBAR_SETTINGS}
          toolbarClick={clickHandler}
          recordClick={rowClick}
        >
          <ColumnsDirective>
            <ColumnDirective
              field="Id"
              width="200"
              textAlign="Right"
              isPrimaryKey={true}
            ></ColumnDirective>
            <ColumnDirective
              field="IsFolder"
              width="200"
              textAlign="Right"
              isPrimaryKey={true}
              template={templateFolder}
            ></ColumnDirective>
            <ColumnDirective
              field="ParentFolderId"
              headerText="ParentFolderId"
              width="150"
              textAlign="Right"
            />
            <ColumnDirective
              field="Nombre"
              headerText="Nombre"
              width="200"
              textAlign="Right"
              showInColumnChooser={false}
            ></ColumnDirective>
            <ColumnDirective field="Sigla" headerText="Sigla"></ColumnDirective>
            <ColumnDirective
              field="Gentilico"
              headerText="Gentilico"
              textAlign="Right"
            />
          </ColumnsDirective>
          <Inject
            services={[
              ColumnChooser,
              Edit,
              Filter,
              Group,
              Page,
              Resize,
              Sort,
              Reorder,
              Toolbar,
            ]}
          />
        </GridComponent>
      </div>
    </div>
  );
}
export default ColumnMenuSample;

const root = createRoot(document.getElementById('sample'));
root.render(<ColumnMenuSample />);
