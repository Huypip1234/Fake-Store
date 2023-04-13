import { useState, useEffect, memo } from "react";
//React Router
import { Outlet, useNavigate } from "react-router-dom";
//component
import Navigation from "../../components/Navigation/Navigation";
import Footer from "../../components/Footer/Footer";
import Spinner from "../../components/Spin";
import { Noti } from "../../components/Noti";
// React-toggle-dark-mode
import { DarkModeSwitch } from "react-toggle-dark-mode";
// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  changeAllProductDataImmutation,
  changeCartData,
  changeIsLoading,
  changeUserInforData,
} from "../../redux/action";
// Interface
import { IAllState, IUserInforData, ICartData } from "../../interface";
// api
import { getAllProduct, getAllUser, getUserShoppingCartData } from "../../api";

function Home() {
  console.log("Home render");

  //Init language
  if (!localStorage.getItem("language")) {
    //hoac === null
    localStorage.setItem("language", JSON.stringify("en")); //Obj to JSON
  }

  //Init isAuth
  if (!localStorage.getItem("isAuth")) {
    //hoac === null
    localStorage.setItem("isAuth", JSON.stringify(false)); //Obj to JSON
  }
  const isAuth: boolean = JSON.parse(localStorage.getItem("isAuth") || "");

  // Init hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Init isDark in local
  if (localStorage.getItem("isDark") === null) {
    localStorage.setItem("isDark", JSON.stringify(false)); //JSON to Obj
  }
  // Get isDark in state
  const [isDarkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("isDark") || "")
  );

  // Dark mode btn
  const [DarkModeButtonSize, setDarkModeButtonSize] = useState(70);
  const toggleDarkMode = () => {
    localStorage.setItem("isDark", JSON.stringify(!isDarkMode));
    setDarkMode(!isDarkMode);
  };

  //GET DATA PHRASE 1: UserData and AllProduct
  useEffect(() => {
    //Prevent login
    !isAuth && navigate("/login");
    // Get user infor Data
    getAllUser()
      .then((res) => {
        // find user from all user
        const userInforData = res.data.find(
          (element: IUserInforData) =>
            element.username ===
            JSON.parse(localStorage.getItem("data") || "").username
        );
        // dispatch to redux
        dispatch(changeUserInforData(userInforData));
      })
      .catch((err) => {
        Noti("error", err.response.status, err.response.data.message);
      });
    // Get allProducData
    getAllProduct()
      .then((res) => {
        dispatch(changeAllProductDataImmutation(res.data));
      })
      .catch((err) => {
        Noti("error", err.response.status, err.response.data.message);
      });
  }, []);
  const userInforData = useSelector(
    (allState: IAllState) => allState.userInforData
  );
  const allProductDataImmutation = useSelector(
    (allState: IAllState) => allState.allProductDataImmutation
  );
  //END GET DATA PHRASE 1

  //GET DATA PHRASE 2: Cart data of user
  interface ICartDataTemporary {
    productId: number;
    quantity: number;
  }

  useEffect(() => {
    dispatch(changeIsLoading(true));
    getUserShoppingCartData(userInforData.id)
      .then((res) => {
        const cartDataTemporary: ICartDataTemporary[] = res.data?.products;
        //get data product
        const data: ICartData[] = [];
        cartDataTemporary?.forEach((element) => {
          const found = allProductDataImmutation.find(
            (ele) => ele.id === element.productId
          );
          found &&
            data.push({ productData: found, quantity: element.quantity });
        });
        dispatch(changeCartData(data));

        dispatch(changeIsLoading(false));
      })
      .catch((err) => {
        dispatch(changeIsLoading(false));
        Noti("error", err.response.status, err.response.data.message);
      });
  }, [userInforData, allProductDataImmutation]);
  /* END GET DATA PHRASE 2 */

  // loading
  const loading = useSelector((allState: IAllState) => allState.isLoading);

  /* Dark Mode init */
  JSON.parse(localStorage.getItem("isDark") || "")
    ? document.body.classList.add("dark")
    : document.body.classList.remove("dark");
  /* End Dark Mode init */

  return (
    <div>
      {loading && <Spinner />}

      <div className={`dark:bg-slate-900 ease-in-out duration-300 `}>
        {/* Dark mode btn */}
        <div className="fixed z-[99999] bottom-0 right-0 w-[5rem] h-[5rem] m-[1rem] ease-in-out duration-300 flex justify-center items-center">
          <DarkModeSwitch
            checked={JSON.parse(localStorage.getItem("isDark") || "")}
            onChange={toggleDarkMode}
            size={DarkModeButtonSize}
            /* style={{ transition: "all 0.3s ease"}} */
            className="bg-slate-200 dark:bg-slate-500 p-4 dark:p-1 rounded-[100%] transition-all duration-300 ease-linear"
            onMouseOver={() => {
              setDarkModeButtonSize(80);
            }}
            onMouseOut={() => {
              setDarkModeButtonSize(70);
            }}
          />
        </div>
        {/* End Dark Mode btn */}

        {/* Main Home*/}
        <Navigation />
        <Outlet />
        <Footer />
        {/* End Main Home*/}
      </div>
    </div>
  );
}

export default memo(Home);
