import { createSearchParams, useNavigate } from 'react-router-dom';

export const useNavigateSearch = (): any => {
  const navigate = useNavigate();
  return (pathname: string, params: any) =>
    navigate({
      pathname,
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      search: `?${createSearchParams(params)}`
    });
};
