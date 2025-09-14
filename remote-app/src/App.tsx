import { useState } from 'react';
import './App.css';
import { Button, Card, CardContent } from '@mui/material';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>RemoteAPP</h1>
      <Card variant="outlined" sx={{ p: 3 }}>
        <CardContent sx={{ p: 1 }}>
          <Button
            onClick={() => setCount((count) => count + 1)}
            variant="contained"
          >
            {' '}
            count is {count}
          </Button>
        </CardContent>
      </Card>
    </>
  );
}

export default App;
