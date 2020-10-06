<script>
  import PollStore from "../stores/PollStore.js";
  import Card from "../shared/Card.svelte";
  import Button from "../shared/Button.svelte";

  export let poll;

  //reactive values
  $: totalVotes = poll.votesA + poll.votesB;
  $: percentA = Math.floor((100 / totalVotes) * poll.votesA) || 0;
  $: percentB = Math.floor((100 / totalVotes) * poll.votesB) || 0;

  //voting event
  const handleVoting = (option, id) => {
    PollStore.update(currentPolls => {
      let copiedPolls = [...currentPolls];
      let upvotedPoll = copiedPolls.find(poll => poll.id === id);

      if (option === "a") {
        upvotedPoll.votesA++;
      } else if (option === "b") {
        upvotedPoll.votesB++;
      }

      return copiedPolls;
    });
  };

  //deleting poll
  const handleDelete = id => {
    PollStore.update(currentPolls => {
      return currentPolls.filter(poll => poll.id != id);
    });
  };
</script>

<style>
  h3 {
    margin: 0 auto;
    color: #555;
  }

  p {
    margin-top: 6px;
    margin-bottom: 30px;
    font-size: 14px;
    color: #aaa;
  }

  .answer {
    background: #fafafa;
    cursor: pointer;
    margin: 10px auto;
    position: relative;
  }

  .answer:hover {
    opacity: 0.6;
  }

  span {
    display: inline-block;
    padding: 10px 20px;
  }

  .percent {
    height: 100%;
    position: absolute;
    box-sizing: border-box;
    transition: width 0.2s;
  }

  .percent-a {
    border-left: 4px solid #d91b42;
    background: rgba(217, 27, 66, 0.2);
  }

  .percent-b {
    border-left: 4px solid #45c496;
    background: rgba(69, 196, 150, 0.2);
  }

  .delete {
    margin-top: 30px;
    text-align: center;
  }
</style>

<Card>
  <div class="poll">
    <h3>{poll.question}</h3>
    <p>Total Votes: {totalVotes}</p>
    <div class="answer" on:click={() => handleVoting('a', poll.id)}>
      <div class="percent percent-a" style="width: {percentA}%" />
      <span>{poll.answerA} ({poll.votesA})</span>
    </div>
    <div class="answer" on:click={() => handleVoting('b', poll.id)}>
      <div class="percent percent-b" style="width: {percentB}%" />
      <span>{poll.answerB} ({poll.votesB})</span>
    </div>
    <div class="delete">
      <Button flat={true} on:click={() => handleDelete(poll.id)}>Delete</Button>
    </div>
  </div>
</Card>
