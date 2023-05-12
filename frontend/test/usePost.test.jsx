import axios from 'axios';
import usePost from '../src/hooks/usePost';

jest.mock('axios');

describe('usePost', () => {
  it('should post data successfully', async () => {
    const url = '/api/data';
    const body = { id: 1 };
    const responseData = { data: 'Post success' };

    axios.post.mockResolvedValueOnce({ data: responseData });

    const result = await usePost(url, body);

    expect(axios.post).toHaveBeenCalledWith(url, body);
    expect(result).toEqual(responseData);
  });

  it('should handle error', async () => {
    const url = '/api/data';
    const body = { id: 1 };
    const errorResponse = { response: { status: 404, data: 'Not found' } };

    axios.post.mockRejectedValueOnce(errorResponse);

    const result = await usePost(url, body);

    expect(axios.post).toHaveBeenCalledWith(url, body);
    expect(result).toEqual('Not found');
  });
});
