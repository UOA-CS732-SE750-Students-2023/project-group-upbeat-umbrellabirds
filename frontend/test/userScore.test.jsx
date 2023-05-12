import React from 'react';
import { render } from '@testing-library/react';
import UserScore from '../src/components/UserScore';
import "@testing-library/jest-dom/extend-expect";

test('should render user score and avatar', () => {
  const score = 95;
  const avatar = 'avatar.jpg';

  const { getByText, getByAltText } = render(
    <UserScore score={score} avatar={avatar} />
  );

  const scoreElement = getByText(score.toString());
  const avatarElement = getByAltText('User avatar');

  expect(scoreElement).toBeInTheDocument();
  expect(avatarElement).toBeInTheDocument();
});
