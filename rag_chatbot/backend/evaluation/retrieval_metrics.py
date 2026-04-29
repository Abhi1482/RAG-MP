from typing import List, Dict, Any

class RetrievalEvaluator:
    @staticmethod
    def compute_top_k_accuracy(retrieved_chunks: List[Dict], ground_truth_ids: List[str], k: int) -> float:
        """
        Check if any of the ground truth chunk IDs are in the top k retrieved chunks.
        """
        top_k_ids = [chunk['id'] for chunk in retrieved_chunks[:k]]
        matches = any(gt_id in top_k_ids for gt_id in ground_truth_ids)
        return 1.0 if matches else 0.0

    @staticmethod
    def compute_mrr(retrieved_chunks: List[Dict], ground_truth_ids: List[str]) -> float:
        """
        Compute Mean Reciprocal Rank.
        """
        for i, chunk in enumerate(retrieved_chunks):
            if chunk['id'] in ground_truth_ids:
                return 1.0 / (i + 1)
        return 0.0

def main():
    # Example evaluation usage
    retrieved = [{"id": "doc1_1"}, {"id": "doc1_2"}, {"id": "doc2_1"}]
    ground_truth = ["doc1_2"]
    
    accuracy = RetrievalEvaluator.compute_top_k_accuracy(retrieved, ground_truth, k=1)
    print(f"Top-1 Accuracy: {accuracy}")
    
    accuracy_3 = RetrievalEvaluator.compute_top_k_accuracy(retrieved, ground_truth, k=3)
    print(f"Top-3 Accuracy: {accuracy_3}")
    
    mrr = RetrievalEvaluator.compute_mrr(retrieved, ground_truth)
    print(f"MRR: {mrr}")

if __name__ == "__main__":
    main()
