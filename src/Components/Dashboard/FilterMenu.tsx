import React, { useState, useRef } from 'react';
import { METHOD, METHOD_NAME, MATERIAL, MATERIAL_NAME } from 'Utils/Constants';
import Filter from 'Components/Common/Filter';
import Toggle from 'Components/Common/Toggle';
import 'Components/Dashboard/scss/FilterMenu.scss';
import { IFilterMenu } from 'Utils/Interface';
import RefreshIcon from 'Assets/RefreshIcon.png';

const FilterMenu: React.FC<IFilterMenu> = ({
  selectedMethod,
  setSelectedMethod,
  selectedMaterial,
  setSelectedMaterial,
}) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [isToggleSelect, setIsToggleSelect] = useState<string>('');
  const methodRef = useRef<HTMLButtonElement>(null);
  const materialRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const onClickSelect = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    name: string
  ) => {
    e.preventDefault();

    if (name === 'method') {
      methodRef.current?.classList.toggle('focused');
    } else if (name === 'material') {
      materialRef.current?.classList.toggle('focused');
    }
    if (isToggleSelect === '') {
      setIsToggleSelect(name);
    } else {
      setIsToggleSelect('');
      methodRef.current?.classList.remove('focused');
      materialRef.current?.classList.remove('focused');
    }
  };

  const onClickReset = () => {
    setSelectedMethod([]);
    setSelectedMaterial([]);
    setIsToggleSelect('');
    methodRef.current?.classList.remove('focused');
    materialRef.current?.classList.remove('focused');
  };

  // console.log(toggle);
  return (
    <div className="filter">
      <div className="filter__select-item">
        <Filter
          title={METHOD_NAME}
          name="method"
          options={METHOD}
          isToggleSelect={isToggleSelect === 'method'}
          setIsToggleSelect={setIsToggleSelect}
          buttonRef={methodRef}
          onClickSelect={onClickSelect}
          selected={selectedMethod}
          setSelected={setSelectedMethod}
        />
        <Filter
          title={MATERIAL_NAME}
          name="material"
          options={MATERIAL}
          isToggleSelect={isToggleSelect === 'material'}
          setIsToggleSelect={setIsToggleSelect}
          buttonRef={materialRef}
          onClickSelect={onClickSelect}
          selected={selectedMaterial}
          setSelected={setSelectedMaterial}
        />
        {selectedMethod.length + selectedMaterial.length > 0 && (
          <button className="filter__select-reset" onClick={onClickReset}>
            <img src={RefreshIcon} alt="필터링 리셋" />
            필터링 리셋
          </button>
        )}
      </div>
      <div className="filter__toggle-item">
        <Toggle handleToggle={handleToggle} />
      </div>
    </div>
  );
};

export default FilterMenu;
