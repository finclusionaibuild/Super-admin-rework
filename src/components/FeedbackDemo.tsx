import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { useFeedback } from '../hooks/useFeedback';

export const FeedbackDemo: React.FC = () => {
  const { 
    showSuccess, 
    showError, 
    showWarning, 
    showInfo, 
    showLoading, 
    showConfirmation,
    showApiResponse,
    clear 
  } = useFeedback();

  return (
    <Card className="max-w-2xl mx-auto m-8">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4">🎉 Feedback System Demo</h2>
        <p className="text-gray-600 mb-6">
          Test the robust popup feedback system with different types and positions.
        </p>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Button 
            onClick={() => showSuccess("Success! Operation completed.")}
            className="bg-green-600 hover:bg-green-700"
          >
            ✅ Success
          </Button>
          
          <Button 
            onClick={() => showError("Error! Something went wrong.", {
              action: { label: 'Retry', onClick: () => console.log('Retry clicked') }
            })}
            className="bg-red-600 hover:bg-red-700"
          >
            ❌ Error
          </Button>
          
          <Button 
            onClick={() => showWarning("Warning! Please be careful.")}
            className="bg-yellow-600 hover:bg-yellow-700"
          >
            ⚠️ Warning
          </Button>
          
          <Button 
            onClick={() => showInfo("Info: Here's some information.", {
              position: 'bottom-left'
            })}
            className="bg-blue-600 hover:bg-blue-700"
          >
            ℹ️ Info
          </Button>
          
          <Button 
            onClick={() => showLoading("Loading your data...")}
            className="bg-purple-600 hover:bg-purple-700"
          >
            🔄 Loading
          </Button>
          
          <Button 
            onClick={() => showConfirmation(
              "Delete this item permanently?",
              () => showSuccess("Item deleted!"),
              () => showInfo("Deletion cancelled")
            )}
            className="bg-orange-600 hover:bg-orange-700"
          >
            🤔 Confirm
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <Button 
            onClick={() => showApiResponse({
              success: true,
              message: "API call successful!",
              statusCode: 200
            })}
            variant="outline"
            className="border-green-200 text-green-700"
          >
            📡 API Success
          </Button>
          
          <Button 
            onClick={() => showApiResponse({
              success: false,
              message: "Network connection failed",
              statusCode: 500
            })}
            variant="outline"
            className="border-red-200 text-red-700"
          >
            📡 API Error
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <Button 
            onClick={() => showSuccess("Top Left!", { position: 'top-left' })}
            variant="outline"
            size="sm"
          >
            Top Left
          </Button>
          
          <Button 
            onClick={() => showInfo("Top Center!", { position: 'top-center' })}
            variant="outline"
            size="sm"
          >
            Top Center
          </Button>
          
          <Button 
            onClick={() => showWarning("Top Right!", { position: 'top-right' })}
            variant="outline"
            size="sm"
          >
            Top Right
          </Button>
          
          <Button 
            onClick={() => showError("Bottom Left!", { position: 'bottom-left' })}
            variant="outline"
            size="sm"
          >
            Bottom Left
          </Button>
          
          <Button 
            onClick={() => showSuccess("Bottom Center!", { position: 'bottom-center' })}
            variant="outline"
            size="sm"
          >
            Bottom Center
          </Button>
          
          <Button 
            onClick={() => showInfo("Bottom Right!", { position: 'bottom-right' })}
            variant="outline"
            size="sm"
          >
            Bottom Right
          </Button>
        </div>

        <div className="flex gap-4">
          <Button 
            onClick={clear}
            variant="outline"
            className="flex-1"
          >
            🗑️ Clear All
          </Button>
          
          <Button 
            onClick={() => {
              // Simulate login feedback
              const loadingId = showLoading("Signing you in...");
              setTimeout(() => {
                showSuccess("Login successful! Welcome back!", {
                  duration: 3000
                });
              }, 2000);
            }}
            className="flex-1 bg-[#4340ff] hover:bg-[#3632e6]"
          >
            🚀 Test Login Flow
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
