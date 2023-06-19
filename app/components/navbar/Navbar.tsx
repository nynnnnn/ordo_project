'use client'

import { cUser } from "@/app/types";

// import Categories from "./Categories";
import Container from "../Container";
import Logo from "./Logo";
// import Search from "./Search";
import UserMenu from "./UserMenu";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { userActions } from "@/app/redux/features/userSlice";

interface NavbarProps {
  currentUser?: cUser | null;
}

const Navbar: React.FC<NavbarProps> = ({currentUser}) => {

  const { name } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  
  name === "" && dispatch(userActions.setUserName("rlagoal"));

  // // console.log(aa);
  console.log(name);

  return ( 
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div
        className="
          py-4 
          border-b-[1px]
        "
      >
      <Container>
        <div 
          className="
            flex 
            flex-row 
            items-center 
            justify-between
            gap-3
            md:gap-0
          "
        >
          <Logo />
          {/* <Search /> */}
          <UserMenu currentUser={currentUser} />
        </div>
      </Container>
    </div>
    {/* <Categories /> */}
  </div>
  );
}


export default Navbar;