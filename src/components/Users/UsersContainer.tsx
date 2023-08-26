import { useDispatch } from "react-redux"
import { Users } from "./Users"
import { useSelector } from "react-redux"
import { ReducersType } from "redux/reduxStore"
import { UserType, UsersType, followAC, setCurrentPageAC, setTotalUsersCountAC, setUsersAC } from "redux/usersReducer"
import { UsersClass } from "./UsersClass"

export const UsersContainer = () => {

    const usersData = useSelector<ReducersType, UsersType>(state => state.usersData)
    const dispatch = useDispatch()
    
        const dispatchFollow = (userId: number) => {
            dispatch(followAC(userId))
        }
        const dispatchNewUsers = (users: UserType[]) => {
            dispatch(setUsersAC(users))
        }
        const dispatchNewCurrentPage = (currentPage: number) => {
            dispatch(setCurrentPageAC(currentPage))
        }
        const dispatchNewTotalUsersCount = (totalUsersCount: number) => {
            dispatch(setTotalUsersCountAC(totalUsersCount))
        }
    

    return <UsersClass usersData={usersData} dispatchFollow={dispatchFollow} dispatchNewUsers={dispatchNewUsers} dispatchNewCurrentPage={dispatchNewCurrentPage} dispatchNewTotalUsersCount={dispatchNewTotalUsersCount}/>
}