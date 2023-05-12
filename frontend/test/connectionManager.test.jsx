import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { socket } from '../src/socket';
import { ConnectionManager } from '../src/components/ConnectionManager';

jest.mock('../src/socket', () => ({
  socket: {
    connect: jest.fn(),
    disconnect: jest.fn(),
  },
}));

describe('ConnectionManager', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call socket.connect when "Connect" button is clicked', () => {
    const { getByText } = render(<ConnectionManager />);
    const connectButton = getByText('Connect');

    fireEvent.click(connectButton);

    expect(socket.connect).toHaveBeenCalledTimes(1);
  });

  it('should call socket.disconnect when "Disconnect" button is clicked', () => {
    const { getByText } = render(<ConnectionManager />);
    const disconnectButton = getByText('Disconnect');

    fireEvent.click(disconnectButton);

    expect(socket.disconnect).toHaveBeenCalledTimes(1);
  });
});
