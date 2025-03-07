export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      agreements: {
        Row: {
          client_id: string
          created_at: string | null
          department: Database["public"]["Enums"]["department_type"]
          description: string | null
          file_url: string
          id: string
          project_id: string | null
          title: string
          uploaded_by: string
        }
        Insert: {
          client_id: string
          created_at?: string | null
          department: Database["public"]["Enums"]["department_type"]
          description?: string | null
          file_url: string
          id?: string
          project_id?: string | null
          title: string
          uploaded_by: string
        }
        Update: {
          client_id?: string
          created_at?: string | null
          department?: Database["public"]["Enums"]["department_type"]
          description?: string | null
          file_url?: string
          id?: string
          project_id?: string | null
          title?: string
          uploaded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "agreements_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agreements_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      announcements: {
        Row: {
          content: string
          created_at: string | null
          created_by: string
          expires_at: string | null
          id: string
          important: boolean | null
          title: string
        }
        Insert: {
          content: string
          created_at?: string | null
          created_by: string
          expires_at?: string | null
          id?: string
          important?: boolean | null
          title: string
        }
        Update: {
          content?: string
          created_at?: string | null
          created_by?: string
          expires_at?: string | null
          id?: string
          important?: boolean | null
          title?: string
        }
        Relationships: []
      }
      attachments: {
        Row: {
          created_at: string | null
          id: string
          name: string
          project_id: string | null
          size: number
          task_id: string | null
          type: string
          uploaded_by: string
          url: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          project_id?: string | null
          size: number
          task_id?: string | null
          type: string
          uploaded_by: string
          url: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          project_id?: string | null
          size?: number
          task_id?: string | null
          type?: string
          uploaded_by?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "attachments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attachments_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          company: string | null
          created_at: string | null
          created_by: string
          email: string | null
          id: string
          name: string
          notes: string | null
          phone: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          created_by: string
          email?: string | null
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          created_by?: string
          email?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
        }
        Relationships: []
      }
      comments: {
        Row: {
          author_id: string
          content: string
          created_at: string | null
          id: string
          task_id: string | null
          updated_at: string | null
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string | null
          id?: string
          task_id?: string | null
          updated_at?: string | null
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string | null
          id?: string
          task_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar: string | null
          created_at: string | null
          department: Database["public"]["Enums"]["department_type"]
          email: string
          id: string
          name: string
          role: Database["public"]["Enums"]["user_role"]
        }
        Insert: {
          avatar?: string | null
          created_at?: string | null
          department: Database["public"]["Enums"]["department_type"]
          email: string
          id: string
          name: string
          role?: Database["public"]["Enums"]["user_role"]
        }
        Update: {
          avatar?: string | null
          created_at?: string | null
          department?: Database["public"]["Enums"]["department_type"]
          email?: string
          id?: string
          name?: string
          role?: Database["public"]["Enums"]["user_role"]
        }
        Relationships: []
      }
      projects: {
        Row: {
          client_id: string | null
          created_at: string | null
          created_by: string
          deadline: string | null
          department: Database["public"]["Enums"]["department_type"]
          description: string | null
          id: string
          progress: number | null
          status: Database["public"]["Enums"]["project_status"] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          client_id?: string | null
          created_at?: string | null
          created_by: string
          deadline?: string | null
          department: Database["public"]["Enums"]["department_type"]
          description?: string | null
          id?: string
          progress?: number | null
          status?: Database["public"]["Enums"]["project_status"] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          client_id?: string | null
          created_at?: string | null
          created_by?: string
          deadline?: string | null
          department?: Database["public"]["Enums"]["department_type"]
          description?: string | null
          id?: string
          progress?: number | null
          status?: Database["public"]["Enums"]["project_status"] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      quote_items: {
        Row: {
          created_at: string | null
          description: string
          id: string
          quantity: number | null
          quote_id: string
          unit_price: number
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          quantity?: number | null
          quote_id: string
          unit_price: number
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          quantity?: number | null
          quote_id?: string
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "quote_items_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      quotes: {
        Row: {
          amount: number
          client_id: string
          created_at: string | null
          created_by: string
          description: string | null
          id: string
          project_title: string
          status: string | null
          valid_until: string | null
        }
        Insert: {
          amount: number
          client_id: string
          created_at?: string | null
          created_by: string
          description?: string | null
          id?: string
          project_title: string
          status?: string | null
          valid_until?: string | null
        }
        Update: {
          amount?: number
          client_id?: string
          created_at?: string | null
          created_by?: string
          description?: string | null
          id?: string
          project_title?: string
          status?: string | null
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quotes_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      task_dependencies: {
        Row: {
          created_at: string | null
          dependent_task_id: string
          id: string
          parent_task_id: string
        }
        Insert: {
          created_at?: string | null
          dependent_task_id: string
          id?: string
          parent_task_id: string
        }
        Update: {
          created_at?: string | null
          dependent_task_id?: string
          id?: string
          parent_task_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_dependencies_dependent_task_id_fkey"
            columns: ["dependent_task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_dependencies_parent_task_id_fkey"
            columns: ["parent_task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          assignee_id: string | null
          created_at: string | null
          created_by: string
          department: Database["public"]["Enums"]["department_type"]
          description: string | null
          due_date: string | null
          id: string
          priority: Database["public"]["Enums"]["task_priority"] | null
          project_id: string | null
          status: Database["public"]["Enums"]["task_status"] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          assignee_id?: string | null
          created_at?: string | null
          created_by: string
          department: Database["public"]["Enums"]["department_type"]
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: Database["public"]["Enums"]["task_priority"] | null
          project_id?: string | null
          status?: Database["public"]["Enums"]["task_status"] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          assignee_id?: string | null
          created_at?: string | null
          created_by?: string
          department?: Database["public"]["Enums"]["department_type"]
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: Database["public"]["Enums"]["task_priority"] | null
          project_id?: string | null
          status?: Database["public"]["Enums"]["task_status"] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
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
      department_type: "Audiophiles" | "Vismasters" | "adVYBE"
      project_status:
        | "planning"
        | "in-progress"
        | "review"
        | "completed"
        | "on-hold"
      task_priority: "low" | "medium" | "high" | "urgent"
      task_status: "todo" | "in-progress" | "review" | "completed"
      user_role: "admin" | "director" | "head" | "member"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
