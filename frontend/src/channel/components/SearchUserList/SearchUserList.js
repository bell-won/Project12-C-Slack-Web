import React from 'react'
import styled from 'styled-components'
import { COLOR } from '../../../shared/constant/style'
import SearchUserCard from '../SearchUserCard'

function SearchUserList({ searchResult, inviteUserList, setInviteUserList }) {
  return (
    <SearchUserListArea>
      {searchResult.length !== 0 ? (
        searchResult.map((info, idx) => (
          <SearchUserCard
            key={idx}
            userInfo={info}
            inviteUserList={inviteUserList}
            setInviteUserList={setInviteUserList}
          />
        ))
      ) : (
        <NoResultArea>No matches found</NoResultArea>
      )}
    </SearchUserListArea>
  )
}
const SearchUserListArea = styled.div`
  position: absolute;
  width: 100%;
  max-height: 200px;
  background: ${COLOR.BACKGROUNT_MODAL_GRAY};
  border: 1px solid ${COLOR.BACKGROUNT_MODAL_GRAY};
  border-radius: 10px;
  overflow: hidden;
`

const NoResultArea = styled.div`
  width: 100%;
  height: 50px;
  font-size: 17px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default SearchUserList
