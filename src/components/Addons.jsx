import React, { useEffect, useState } from 'react';
import { Button, SelectableTile } from 'carbon-components-react';
import { ipcRenderer } from 'electron';

function Addons() {
  const [addons, setAddons] = useState([]);
  const [disabled, setDisabled] = useState(true);

  const handleAddonsClick = (addon) => {
    // toggle element inside addons arr on SelectableTile click
    addons.includes(addon)
      ? setAddons(addons.filter((e) => e !== addon))
      : setAddons([...addons, addon]);
  };

  useEffect(() => {
    addons.length > 0 ? setDisabled(false) : setDisabled(true);
  }, [addons]);

  const handleInstallClick = async () => {
    const r = await ipcRenderer.invoke(
      'install-addons',
      JSON.stringify(addons)
    );
    console.log(r);
  };

  return (
    <>
      <div role="group" aria-label="selectable tiles">
        <SelectableTile onClick={() => handleAddonsClick('d912pxy')}>
          d912pxy
        </SelectableTile>
        <SelectableTile onClick={() => handleAddonsClick('arcdps')}>
          ArcDPS
        </SelectableTile>
        <SelectableTile onClick={() => handleAddonsClick('gw_radial')}>
          GW Radial
        </SelectableTile>
      </div>
      <Button
        disabled={disabled}
        style={{ marginTop: '10px' }}
        onClick={() => handleInstallClick(addons)}
      >
        Install
      </Button>
    </>
  );
}

export default Addons;
