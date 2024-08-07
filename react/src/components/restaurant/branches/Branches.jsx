import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Loader from "../../../layouts/loader/loader";
import { useBranch } from "./BranchContext";
import { BranchAddress } from "./BranchAddress";
import { BranchOpening } from "./BranchOpening";
import { BranchTables } from "./BranchTables";
import BranchComments from "../../review/comments/BranchComments";
import Tables from "../tables/TablesCollection";
import "./Branches.css";

const Branches = () => {
  const { locations: branches } = useSelector((state) => state.restaurant);
  const [showTables, setShowTables] = useState(false);
  const { branch, setBranch } = useBranch();
  let { branchId = "", showBranchTables = false } = location.state || {};
  console.log(branchId);

  useEffect(() => {
    if (showBranchTables) {
      setShowTables(showBranchTables);
    }
  }, [showBranchTables]);

  useEffect(() => {
    if (branches.length > 0 && !branch) {
      setBranch(branches[0]);
    }
  }, [branches, branch, setBranch]);

  const handleShowTables = (show) => {
    setShowTables(show);
  };

  const handleSelect = (key) => {
    const selectedBranch = branches.find((branch) => branch.id == key);
    setBranch(selectedBranch);
    setShowTables(false);
  };

  return (
    <section className="branches m-4">
      <Tabs
        activeKey={branch?.id}
        onSelect={handleSelect}
        className="br-tabs border-0"
      >
        {branches.length > 0 ? (
          branches.map((branch) => (
            <Tab key={branch.id} eventKey={branch.id} title={branch.city.name}>
              <h2 className="text-sec text-center sec-font mt-4">
                {branch.city.name}
              </h2>
              {showTables ? (
                <Tables tables={branch.tables} />
              ) : (
                <BranchDetails onShowTables={handleShowTables} />
              )}
            </Tab>
          ))
        ) : (
          <p className="text-center text-color">
            No Branches For this Restaurant
          </p>
        )}
      </Tabs>
    </section>
  );
};

const BranchDetails = ({ onShowTables }) => {
  const { branch } = useBranch();

  if (!branch) {
    return <Loader />;
  }

  return (
    <div className="row justify-content-md-between justify-content-center p-3">
      <BranchTables onShowTables={onShowTables} />
      <BranchOpening />
      <BranchAddress />
      <BranchComments />
    </div>
  );
};

export default Branches;
