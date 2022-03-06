import React from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    padding: 12px;
    
    .support-wrapper {
        width: 100%;
        border-radius: 14px;
        padding: 16px;
        box-shadow: 1px 0 4px rgb(0 2 4 / 6%), 0 7px 18px rgb(1 1 1 / 5%);
    }
}
`;
function Support() {
  return (
    <Container>
      <div className="support-wrapper">Support</div>
    </Container>
  );
}

export default Support;
