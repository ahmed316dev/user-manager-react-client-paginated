import React, { useEffect } from 'react'
import { DropdownButton, Dropdown } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'

import { setLimit } from '../redux/Pagination/pagination.actions'
import { fetchUsers } from '../redux/Users/users.actions'

const DropdownMenu = () => {
  const dispatch = useDispatch()
  const limit = useSelector(state => state.pagination.limit)

  useEffect(() => dispatch(fetchUsers(limit)), [dispatch, limit])

  return (
    <div>
      <DropdownButton
        menuVariant="dark"
        className="mb-3"
        align="end"
        title={`Show ${limit || 5} Users per Page`}
      >
        <Dropdown.Item onClick={() => dispatch(setLimit(5))}>
          Show 5 Users per Page
        </Dropdown.Item>
        <Dropdown.Item onClick={() => dispatch(setLimit(10))}>
          Show 10 Users per Page
        </Dropdown.Item>
        <Dropdown.Item onClick={() => dispatch(setLimit(20))}>
          Show 20 Users per Page
        </Dropdown.Item>
      </DropdownButton>
    </div>
  )
}

export default DropdownMenu
