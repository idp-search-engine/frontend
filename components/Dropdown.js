import { Popover } from '@headlessui/react'
import classes from './Dropdown.module.css';

export default function MyDropdown({ user, authURL }) {
    return (
        <Popover className={classes.header}>
          <Popover.Button> <img src={user.userinfo.picture}
                                width="50"
                                height="50"
                                alt="" /></Popover.Button>
    
          <Popover.Panel className="absolute z-100">
            <div className="grid grid-cols-1 bg-red-100">
              <p>{user.userinfo.nickname}</p>
              <p>{user.userinfo.email}</p>
              <a href={authURL + "/logout"}> Logout</a>
            </div>
          </Popover.Panel>
        </Popover>
      )
}