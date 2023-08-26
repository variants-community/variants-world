export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      _GameRuleToPost: {
        Row: {
          A: number
          B: number
        }
        Insert: {
          A: number
          B: number
        }
        Update: {
          A?: number
          B?: number
        }
        Relationships: [
          {
            foreignKeyName: '_GameRuleToPost_A_fkey'
            columns: ['A']
            referencedRelation: 'GameRule'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: '_GameRuleToPost_B_fkey'
            columns: ['B']
            referencedRelation: 'Post'
            referencedColumns: ['id']
          }
        ]
      }
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      Comment: {
        Row: {
          content: string
          createdAt: string
          id: number
          parent_id: number | null
          postId: number
          userId: number
        }
        Insert: {
          content: string
          createdAt?: string
          id?: number
          parent_id?: number | null
          postId: number
          userId: number
        }
        Update: {
          content?: string
          createdAt?: string
          id?: number
          parent_id?: number | null
          postId?: number
          userId?: number
        }
        Relationships: [
          {
            foreignKeyName: 'Comment_parent_id_fkey'
            columns: ['parent_id']
            referencedRelation: 'Comment'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'Comment_postId_fkey'
            columns: ['postId']
            referencedRelation: 'Post'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'Comment_userId_fkey'
            columns: ['userId']
            referencedRelation: 'User'
            referencedColumns: ['id']
          }
        ]
      }
      GameRule: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      Post: {
        Row: {
          authorUserId: number
          createdAt: string
          description: string
          id: number
          status: Database['public']['Enums']['GameStatus']
          title: string
          type: Database['public']['Enums']['GameType']
          updatedAt: string
          variantLink: string
          verdict: string | null
        }
        Insert: {
          authorUserId: number
          createdAt?: string
          description: string
          id?: number
          status: Database['public']['Enums']['GameStatus']
          title: string
          type?: Database['public']['Enums']['GameType']
          updatedAt?: string
          variantLink: string
          verdict?: string | null
        }
        Update: {
          authorUserId?: number
          createdAt?: string
          description?: string
          id?: number
          status?: Database['public']['Enums']['GameStatus']
          title?: string
          type?: Database['public']['Enums']['GameType']
          updatedAt?: string
          variantLink?: string
          verdict?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'Post_authorUserId_fkey'
            columns: ['authorUserId']
            referencedRelation: 'User'
            referencedColumns: ['id']
          }
        ]
      }
      PostDetails: {
        Row: {
          gameClassification: Database['public']['Enums']['GameClassification'] | null
          gameplayClassification: Database['public']['Enums']['GameplayClassification'] | null
          id: number
          notes: string | null
          postId: number
        }
        Insert: {
          gameClassification?: Database['public']['Enums']['GameClassification'] | null
          gameplayClassification?: Database['public']['Enums']['GameplayClassification'] | null
          id?: number
          notes?: string | null
          postId: number
        }
        Update: {
          gameClassification?: Database['public']['Enums']['GameClassification'] | null
          gameplayClassification?: Database['public']['Enums']['GameplayClassification'] | null
          id?: number
          notes?: string | null
          postId?: number
        }
        Relationships: [
          {
            foreignKeyName: 'PostDetails_postId_fkey'
            columns: ['postId']
            referencedRelation: 'Post'
            referencedColumns: ['id']
          }
        ]
      }
      PostOnUserLikes: {
        Row: {
          postId: number
          userId: number
        }
        Insert: {
          postId: number
          userId: number
        }
        Update: {
          postId?: number
          userId?: number
        }
        Relationships: [
          {
            foreignKeyName: 'PostOnUserLikes_postId_fkey'
            columns: ['postId']
            referencedRelation: 'Post'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'PostOnUserLikes_userId_fkey'
            columns: ['userId']
            referencedRelation: 'User'
            referencedColumns: ['id']
          }
        ]
      }
      User: {
        Row: {
          email: string | null
          id: number
          name: string
          role: Database['public']['Enums']['UserRole']
        }
        Insert: {
          email?: string | null
          id?: number
          name: string
          role?: Database['public']['Enums']['UserRole']
        }
        Update: {
          email?: string | null
          id?: number
          name?: string
          role?: Database['public']['Enums']['UserRole']
        }
        Relationships: []
      }
      Voice: {
        Row: {
          id: number
          postId: number
          testerId: number
          value: Database['public']['Enums']['VoteValue']
        }
        Insert: {
          id?: number
          postId: number
          testerId: number
          value: Database['public']['Enums']['VoteValue']
        }
        Update: {
          id?: number
          postId?: number
          testerId?: number
          value?: Database['public']['Enums']['VoteValue']
        }
        Relationships: [
          {
            foreignKeyName: 'Voice_postId_fkey'
            columns: ['postId']
            referencedRelation: 'PostDetails'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'Voice_testerId_fkey'
            columns: ['testerId']
            referencedRelation: 'User'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      GameClassification: 'MATERIALISTIC' | 'TACTICAL' | 'DYNAMIC' | 'POSITIONAL' | 'STRATEGIC' | 'FORTUNE'
      GameplayClassification: 'FIRST_POSITIVE' | 'FIRST_NEGATIVE' | 'SECOND_POSITIVE' | 'SECOND_NEGATIVE'
      GameStatus: 'ACCEPTED' | 'DECLINED' | 'PENDING_REPLY' | 'UNDER_REVIEW'
      GameType: 'NCV' | 'WOF'
      UserRole: 'TESTER' | 'MEMBER'
      VoteValue: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
