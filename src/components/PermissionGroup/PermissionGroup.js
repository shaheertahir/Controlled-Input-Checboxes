import React from "react";

import CheckboxInput from "../CheckboxInput";

export default function PermissionGroup({
  grpPermissions,
  permissions,
  onGrpHandler,
  onChangeHandler,
}) {
  return (
    <>
      {grpPermissions.map((grp) => (
        <div key={grp.id} className="col-md-6 d-flex">
          <div className="group-card">
            <CheckboxInput
              label={grp.name}
              checked={grp.checked}
              onChange={onGrpHandler}
              name={grp.name}
              className="grp-permissions"
            />
            {permissions
              .filter((per) => grp.permissions.includes(per.id))
              .map((data) => (
                <CheckboxInput
                  label={data.name}
                  checked={data.checked}
                  onChange={onChangeHandler}
                  name={data.name}
                  className="permissions"
                  key={data.id}
                />
              ))}
          </div>
        </div>
      ))}
    </>
  );
}
