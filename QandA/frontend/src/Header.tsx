import { UserIcon } from './Icons';
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { fontFamily, fontSize, gray1, gray2, gray5 } from './Styles';
import { ChangeEvent, FC, useState, FormEvent } from 'react';
import {
  Link,
  RouteComponentProps as RouteProp,
  withRouter,
} from 'react-router-dom';

//https://www.youtube.com/watch?v=oerEgi1AzQU 11:50
//Destruct history an location in props Header component
export const Header: FC<RouteProp> = ({ history, location }) => {
  const searchParams = new URLSearchParams(location.search);
  const criteria = searchParams.get('criteria') || '';
  const [zoek, setZoek] = useState(criteria);

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setZoek(e.currentTarget.value); //zodat het zoekbar werkt volgens React

    console.log(e.currentTarget.value);
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    history.push(`/zoek?criteria=${zoek}`); //zorgt ervoor dat de zoekbalk redirect
  };

  return (
    <div
      css={css`
        position: fixed;
        box-sizing: border-box;
        top: 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 20px;
        background-color: #3bd0eb;
        border-bottom: 1px solid ${gray5};
        box-shadow: 0 3px 7px 0 rgba(110, 112, 114, 0.21);
      `}
    >
      <Link
        to="/"
        css={css`
          font-size: 24px;
          font-weight: bold;
          color: ${gray1};
          text-decoration: none;
        `}
      >
        Garbage Donkey
      </Link>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Zoek..."
          value={zoek}
          onChange={handleSearchInputChange}
          css={css`
            box-sizing: border-box;
            font-family: ${fontFamily};
            font-size: ${fontSize};
            padding: 8px 10px;
            border: 1px solid ${gray5};
            border-radius: 6px;
            color: ${gray2};
            margin-right: 60px;
            background-color: white;
            width: 200px;
            height: 30px;
            :focus {
              outline-color: ${gray5};
            }
          `}
        />
      </form>

      <Link
        to="./signin"
        css={css`
          font-family: ${fontFamily};
          font-size: ${fontSize};
          padding: 5px 10px;
          background-color: transparent;
          color: ${gray2};
          text-decoration: none;
          cursor: pointer;
          span {
            margin-left: 10px;
          }
          ::focus {
            outline-color: ${gray5};
          }
        `}
      >
        <UserIcon /> <span>Sign in</span>{' '}
      </Link>
    </div>
  );
};
//wrapping the component with this props to pass by
export const HeaderWithRouter = withRouter(Header);
