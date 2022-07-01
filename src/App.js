import { useState } from "react";

import "./App.css";

import CheckboxInput from "./components/CheckboxInput/CheckboxInput";
import PermissionGroup from "./components/PermissionGroup";

function App() {
  const [selectAll, setSelectAll] = useState(false);
  const [permissions, setPermissions] = useState([
    { id: 1, name: "Rashid", checked: false },
    { id: 2, name: "Waleed", checked: false },
    { id: 3, name: "Usama", checked: false },
    { id: 4, name: "Rashim", checked: false },
    { id: 5, name: "Ali", checked: false },
    { id: 6, name: "Anas", checked: false },
    { id: 7, name: "Zuhair", checked: false },
    { id: 8, name: "Waseem", checked: false },
    { id: 9, name: "Zain", checked: false },
    { id: 10, name: "Amir", checked: false },
    { id: 11, name: "Faraz", checked: false },
    { id: 12, name: "Bilal", checked: false },
    { id: 13, name: "Abbas", checked: false },
    { id: 14, name: "Ahad", checked: false },
    { id: 15, name: "Zeeshan", checked: false },
    { id: 16, name: "Kashif", checked: false },
  ]);
  const [grpPermissions, setGrpPermissions] = useState([
    { id: 1, name: "Security", checked: false, permissions: [1, 2, 3, 4] },
    { id: 2, name: "Medical", checked: false, permissions: [5, 6, 7, 8] },
    { id: 3, name: "Admin", checked: false, permissions: [9, 10, 11, 12] },
    { id: 4, name: "Cafeteria", checked: false, permissions: [13, 14, 15, 16] },
  ]);
  const grpPermissionsCloned = [...grpPermissions];
  const permissionsCloned = [...permissions];

  function findPositions(first, second) {
    const indicies = [];
    first.forEach((element, index) => {
      if (second.permissions.includes(element.id)) {
        indicies.push(index);
      }
    });
    return indicies;
  }

  function onGroupSelectAllHandler() {
    const selected = grpPermissionsCloned.filter(
      (grp) => grp.checked === false
    );
    if (selected.length > 0) {
      setSelectAll(false);
    } else {
      setSelectAll(true);
    }
  }

  function checkGroupPermissions(group) {
    const selectedPermissions = permissionsCloned.filter((per) =>
      group[0].permissions.includes(per.id)
    );
    const selectedGrpPermissions = selectedPermissions.filter(
      (per) => per.checked === false
    );
    if (selectedGrpPermissions.length < 1) {
      group[0].checked = true;
    } else {
      group[0].checked = false;
    }
  }

  function onSelectAllHandler(e) {
    setSelectAll(e.target.checked);
    SelectAllHandler(e.target.checked);
  }

  function SelectAllHandler(isSelected) {
    const grpPermissionsCloned = grpPermissions.map((grp) => {
      return {
        ...grp,
        checked: isSelected,
      };
    });
    const permissionsCloned = permissions.map((per) => {
      return {
        ...per,
        checked: isSelected,
      };
    });

    setPermissions(permissionsCloned);
    setGrpPermissions(grpPermissionsCloned);
  }

  function onGrpHandler(e) {
    const selectedGroup = grpPermissionsCloned.filter(
      (item) => item.name === e.target.name
    );
    if (selectedGroup && selectedGroup.length > 0) {
      selectedGroup[0].checked = e.target.checked;
      const indexes = findPositions(permissionsCloned, selectedGroup[0]);
      indexes.map(
        (index) => (permissionsCloned[index].checked = e.target.checked)
      );
    }
    onGroupSelectAllHandler();
    setGrpPermissions(grpPermissionsCloned);
    setPermissions(permissionsCloned);
  }

  function onChangeHandler(e) {
    const selectedPermission = permissionsCloned.filter(
      (per) => per.name === e.target.name
    );
    if (selectedPermission && selectedPermission.length > 0) {
      selectedPermission[0].checked = e.target.checked;
    }
    if (permissionsCloned.map((per) => per.checked === false)) {
      setSelectAll(false);
    }
    const selectedGroup = grpPermissionsCloned.filter((item) =>
      item.permissions.includes(selectedPermission[0].id)
    );
    checkGroupPermissions(selectedGroup);
    onGroupSelectAllHandler();
    setPermissions(permissionsCloned);
    setGrpPermissions(grpPermissionsCloned);
  }

  return (
    <div className="container">
      <h1 className="mt-3 text-white">Controlled Input Checkboxes</h1>
      <CheckboxInput
        label="Select All"
        checked={selectAll}
        onChange={onSelectAllHandler}
        name="select_all"
        className="select-all-box"
      />
      <div className="row g-5 mt-1">
        <PermissionGroup
          grpPermissions={grpPermissions}
          permissions={permissions}
          onGrpHandler={onGrpHandler}
          onChangeHandler={onChangeHandler}
        />
      </div>
    </div>
  );
}

export default App;
