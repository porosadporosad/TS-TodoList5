import styled from 'styled-components';

function Header() {
  return (
    <>
      <HearderTop />
      <HerarderMain>
        <div>My Todo List</div>
        <div>React</div>
      </HerarderMain>
    </>
  );
}

export default Header;

const HearderTop = styled.div`
  border-bottom: 3px solid black;
  background: #f5f4f1;
  padding: 10px;
`;

const HerarderMain = styled.div`
  display: flex;
  justify-content: space-between;
  border: 2px solid #f5f4f1;
  margin: 0 25px 0 10px;
  padding: 20px;
`;
