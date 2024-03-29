import styled from '@emotion/styled';
import axios from 'axios';
import { useState } from 'react';
import { errorMessage } from '@/apis/auth';

interface DictionaryType {
  title: string;
  description: string;
}

const ResultInfo = () => {
  const [search, setSearch] = useState(false);
  const [Title, setTitle] = useState<string[]>([]);
  const [info, setInfo] = useState<string>();
  const [infoTitle, setInfoTitle] = useState<string>('');
  const [inputValue, setInputValue] = useState('');
  const [select, setSelect] = useState<number>(0);

  const word = ['가', '나', '다', '라', '마', '바', '사', '아', '자', '차', '카', '타', '파', '하'];

  // title 호출 및 첫 번째 title 관련 상세정보 호출
  const getTitleFn = (value: string, type: string) => {
    // eslint-disable-next-line no-shadow
    const getTitle = async (value: string, type: string) => {
      let response;
      if (type === 'button') {
        response = await axios.get(`https://moreturn.shop:443/api/terms/${value}`);
        setSearch(true);
      } else {
        response = await axios.post(`https://moreturn.shop:443/api/terms?keyword=${value}`);
        setSearch(true);
      }

      if (response?.data.terms.length > 0) {
        setTitle(response?.data.terms.map((v: DictionaryType) => v.title));
        setInfoTitle(response?.data.terms.map((v: DictionaryType) => v.title)[0]);
        setInfo(response?.data.terms.map((v: DictionaryType) => v.description)[0]);
      } else {
        errorMessage('해당 키워드에 해당하는 용어가 없습니다.');
        setSearch(false);
      }
    };
    setSelect(0);
    getTitle(value, type);
  };

  // title 클릭시 관련 상세정보 호출
  const getInfoFn = (value: string, index: number) => {
    // eslint-disable-next-line no-shadow
    const getInfo = async (value: string) => {
      const response = await axios.post(`https://moreturn.shop:443/api/terms?keyword=${value}`);
      setInfoTitle(value);
      setInfo(response.data.terms.map((v: DictionaryType) => v.title === value && v.description));
    };
    getInfo(value);
    setSelect(index);
  };

  // 검색 기능
  type tagetType = {
    target: valueType;
  };

  type valueType = {
    value: string;
  };

  type inputProps = {
    (value: tagetType): void;
  };
  const inputChange: inputProps = ({ target: { value } }) => {
    setInputValue(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getTitleFn(inputValue, 'submit');
    setInputValue('');
  };

  return (
    <>
      <SearchForm>
        <ConsonantButton>
          <p className="sub-title">
            찾고자 하는 용어의 일부 단어나 한글 자음을 누르셔도 용어 검색이 가능합니다.
          </p>
          <p>가나다로 검색</p>
          <div>
            {word.map((v, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <button
                type="button"
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                onClick={(e) => {
                  getTitleFn(e.currentTarget.innerText, 'button');
                }}
              >
                {v}
              </button>
            ))}
          </div>
        </ConsonantButton>

        <SearchInput>
          <p>단어로 검색</p>
          <div>
            <form onSubmit={handleSubmit}>
              <input type="text" name="value" value={inputValue} onChange={inputChange} />
              <button type="submit">검색</button>
            </form>
          </div>
        </SearchInput>
      </SearchForm>

      {search && (
        <ResultWrap>
          <div>
            <ul>
              {Title.map((title, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <li key={index} className={`${select === index ? 'select' : ''}`}>
                  <button
                    type="button"
                    onClick={(e) => getInfoFn(e.currentTarget.innerText, index)}
                  >
                    <p>{title}</p>
                  </button>
                </li>
              ))}
            </ul>
            <ul>
              <li>{infoTitle}</li>
              <li>{info}</li>
            </ul>
          </div>
        </ResultWrap>
      )}
    </>
  );
};

const SearchForm = styled.div`
  width: 100%;
  border-radius: 20px;
  background-color: #f5f6fa;
  padding: 60px 130px;
`;

const ConsonantButton = styled.div`
  p {
    font-size: 24px;
    font-weight: 500;
    color: #505050;
  }

  .sub-title {
    font-weight: 400;
    color: #505050;
    text-align: center;
    margin-bottom: 40px;
  }

  div {
    display: flex;
    justify-content: space-between;
    margin: 20px 0 40px;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    border-radius: 10px;
    font-size: 24px;
    font-weight: 500;
    background-color: #fff;
    color: #171717;
    border: 1px solid #d2d2dc;
    letter-spacing: -0.05em;
    font-family: Pretendard Variable;
  }
`;

const SearchInput = styled.div`
  p {
    font-weight: 500;
    font-size: 24px;
    color: #505050;
  }

  div {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    form {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }

  input {
    width: 828px;
    height: 50px;
    border: 1px solid #d2d2dc;
    border-radius: 10px;
    background-color: #fff;
    color: #171717;
    font-size: 24px;
    padding-left: 10px;

    &:focus {
      outline: none;
      border: 2px solid #4258d7;
    }

    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 30px #fff inset;
      -webkit-text-fill-color: #000;
    }
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      transition: background-color 5000s ease-in-out 0s;
    }
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 130px;
    height: 50px;
    border-radius: 10px;
    background-color: #4258d7;
    border: none;
    font-size: 20px;
    font-weight: 500;
    color: #fff;
    letter-spacing: -0.05em;
    font-family: Pretendard Variable;
  }
`;

const ResultWrap = styled.div`
  p {
    display: inline-block;
    margin: 50px 0 0 40px;
    padding: 0 40px 5px 0;
    border-bottom: 1px solid #000;
    color: #171717;
    font-size: 18px;

    span {
      color: #425bd7;
      font-weight: 500;
    }
  }

  div {
    display: flex;
    justify-content: space-between;
    align-items: start;
    gap: 20px;
    margin-top: 115px;

    ul {
      height: 780px;
      border: 1px solid #d2d2dc;
      border-radius: 20px;
      font-size: 24px;
      overflow: auto;
      &::-webkit-scrollbar {
        background-color: #f4f4f4;
        border-radius: 0 20px 20px 0;
        width: 18px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: #d1d1d1;
        border: 4px solid #f4f4f4;
      }

      li {
        display: flex;
        align-items: center;
        height: 87px;

        &.select {
          background: #f0f4ff;
        }

        button {
          width: 100%;
          height: 100%;
          background: none;
          border: none;
          padding: 0 25px;

          & > p {
            display: block;
            font-size: 24px;
            color: #171717;
            text-align: start;
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin: 0 !important;
            padding: 0;
            box-sizing: border-box;
            border: none;
          }
        }
      }
    }

    ul:first-of-type {
      width: 345px;
    }

    ul:last-of-type {
      width: 100%;

      li {
        padding: 0 25px;
      }

      li:first-of-type {
        background-color: #f0f4ff;
        font-size: 30px;
        font-weight: 500;
        color: #4258d7;
      }

      li:last-of-type {
        height: auto;
        padding-top: 20px;
      }
    }
  }
`;

export default ResultInfo;
