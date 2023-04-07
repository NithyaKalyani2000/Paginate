import { useEffect, useState } from "react";
import * as React from "react";
import axios from "axios";
import "./page.css";
import { useDispatch, useSelector } from "react-redux";
import { next, prev } from "./Redux/Action/action";

function Page() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.reduce_store);
  const [data, setData] = useState([]);
  const [table, settable] = useState([]);
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    loadData();
  }, [count]);

  const loadData = () => {
    if (count >= 1) {
      axios
        .get(`https://api.punkapi.com/v2/beers?page=${count}&per_page=${10}`) //33 pages 325 data
        .then((res) => {
          if (res.data.length !== 0) {
            setShow(true);
            setData(res.data);
            settable(res.data);
            setMsg("");
          } else {
            setShow(false);
            setMsg("No Data Found");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handlePage = (param) => {
    switch (param) {
      case "prev":
        var getval = document.getElementById("searchinput");
        if (getval.value != "") {
          getval.value = "";
        }
        dispatch(prev());
        break;
      case "next":
        var getval = document.getElementById("searchinput");
        if (getval.value != "") {
          getval.value = "";
        }
        dispatch(next());
        break;
      default:
        loadData(param);
    }
  };

  const HandleSearchElement = (e) => {
    let search = table.filter(
      (el) =>
        el.name.toLowerCase().includes(e.toLowerCase()) ||
        el.tagline.toLowerCase().includes(e.toLowerCase()) ||
        el.attenuation_level.toString().includes(e.toString())
    );

    if (search.length > 0 && e !== "") {
      setData(search);
      setMsg("");
    }
    if (search.length === 0) {
      setMsg("No Data Found");
    }
    if (e === "") {
      setMsg("");
      setData(table);
    }
  };

  return (
    <div>
      <div>
        <div
          className="fixed-top"
          style={{
            backgroundColor: "#fff",
            zIndex: 999,
          }}
        >
          <div className="float-end">
            <div className="input-group d-flex">
              <div className="p-2">
                <input
                  style={{ width: "500px" }}
                  id="searchinput"
                  type="text"
                  className="form-control p-2 fa fa-search"
                  placeholder="SEARCH"
                  onChange={(e) => HandleSearchElement(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "50px",
            paddingBottom: "30px",
          }}
        >
          {msg !== "" && <div style={{ fontSize: 26 }}>{msg}</div>}
          {msg === "" && (
            <table className="table table-hover" style={{ width: "96%" }}>
              <thead className="table-secondary">
                <tr>
                  <th scope="col" className="w-25">
                    S.no
                  </th>
                  <th
                    scope="col"
                    className="align-left w-25"
                    style={{ width: "25%" }}
                  >
                    Name
                  </th>
                  <th scope="col" className="w-25">
                    Attenuation Level
                  </th>
                  <th scope="col" className="align-left w-25">
                    Tagline
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.map((et) => (
                  <tr id={"id"} key={et.id}>
                    <td className="align-left">{et.id}</td>
                    <td className="align-left">{et.name}</td>
                    <td className="align-center">{et.attenuation_level}</td>
                    <td className="align-left">{et.tagline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div
          className="fixed-bottom"
          style={{
            marginBottom: "1%",
            marginRight: "5%",
            backgroundColor: "#fff",
            zIndex: 999,
          }}
        >
          <div className="float-end">
            {" "}
            {count >= 2 ? (
              <button
                className="btn btn-light"
                onClick={() => handlePage("prev")}
              >
                <span style={{ fontWeight: "bold" }}>{"< Prev"}</span>
              </button>
            ) : null}
            <button className="btn btn-light">
              {count > 1 ? <span>{count}</span> : 1}
            </button>
            {show && (
              <button
                className="btn btn-light"
                onClick={() => handlePage("next")}
              >
                <span style={{ fontWeight: "bold" }}>{"Next >"}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
