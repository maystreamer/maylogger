import axios from 'axios';

// Configuration
const TOTAL_REQUESTS = 200;
const CONCURRENT_REQUESTS = 100;

async function sendRequest(index: number) {
    const traceId = `trace-${index}`;
    const response = await axios.get('http://localhost:3005', {
        headers: { 'x-trace-id': traceId }, // Pass unique traceId for testing
    });
    console.log(`Request ${index}: Response: ${response.data}`);
}

async function runLoadTest() {
    const tasks: Promise<void>[] = [];
    for (let i = 0; i < TOTAL_REQUESTS; i++) {
        tasks.push(sendRequest(i));

        // Handle concurrency
        if (tasks.length === CONCURRENT_REQUESTS) {
            await Promise.all(tasks);
            tasks.length = 0; // Reset tasks array
        }
    }

    // Final batch
    await Promise.all(tasks);
    console.log('Load test completed.');
}

runLoadTest().catch(console.error);
